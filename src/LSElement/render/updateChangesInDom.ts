import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './gerRootNode';
import { isCustomElement } from '../utils/isCustomElement';
import { updateAttribute } from '../utils/updateAttribute';
import { updateComputedReflectedAttributes } from './updateComputedReflectedAttributes';

function updateAttributes(newElement: Element, currentElement: Element) {
  (newElement as LSCustomElement).ls?.attrsToListen.map(attr => {
    let value = newElement[attr];
    if (attr === 'style') {
      value = newElement.getAttribute('style');
    }
    updateAttribute(currentElement, attr, value);
  });
}

function updateElement(newElement: Element, currentElement: Element, parent: Element | DocumentFragment) {
  if (currentElement.tagName !== newElement.tagName) {
    parent.replaceChild(newElement, currentElement);
  } else {
    const isACustomElement = isCustomElement(newElement);
    if (!isACustomElement && currentElement.outerHTML === newElement.outerHTML) return true;
    updateAttributes(newElement, currentElement);
    if (!isACustomElement && currentElement.outerHTML === newElement.outerHTML) return true;
    const hasShadowRoot = currentElement.shadowRoot;
    if (newElement.children.length > 0 && (!isACustomElement || (isACustomElement && hasShadowRoot))) {
      updateChangesInElement(Array.from(newElement.children), Array.from(currentElement.children), currentElement);
    } else if (!isACustomElement) {
      currentElement.textContent = newElement.textContent;
    }
  }
}

function updateChildren(newChildren: Element[], parent: Element | DocumentFragment) {
  for (let i = 0; i < newChildren.length; i++) {
    updateElement(newChildren[i], parent.children.namedItem(newChildren[i].id), parent);
  }
}

function removeChildren(childToRemove: Element[], parent: Element | DocumentFragment) {
  childToRemove.forEach(child => parent.removeChild(child));
}

function insertNewChildren(childrenToAdd: ChildrenToAddType[], parent: Element | DocumentFragment) {
  childrenToAdd.forEach(child => {
    if (!child.index) child.index = 0;
    if (child.index >= parent.children.length) {
      parent.appendChild(child.element);
    } else {
      parent.insertBefore(child.element, parent.children[child.index]);
    }
  });
}

type ChildrenToAddType = {
  element: Element;
  index: number;
};

function updateChangesInElement(newChildren: Element[], oldChildren: Element[], parent: Element | DocumentFragment) {
  const newChildrenIds = newChildren.map(x => x.id);
  const oldChildrenIds = oldChildren.map(x => x.id);
  const childrenToRemove = oldChildren.filter(x => !newChildrenIds.includes(x.id));
  const childrenToAdd: Array<ChildrenToAddType> = newChildren.map((value, index) => ({ element: value, index })).filter(x => !oldChildrenIds.includes(x.element.id));
  const childrenToUpdate = newChildren.filter(x => oldChildrenIds.includes(x.id));

  removeChildren(childrenToRemove, parent);
  updateChildren(childrenToUpdate, parent);
  insertNewChildren(childrenToAdd, parent);
}

export function updateChangesInDom(self: LSCustomElement) {
  if (self.ls.alreadyRendered) {
    updateComputedReflectedAttributes(self);
    if (self.componentWillUpdate) {
      self.componentWillUpdate();
    }
    const newChildren = render(self);
    const oldChildren = getChildren(self);
    const rootNode = getRootNode(self);
    updateChangesInElement(newChildren, oldChildren, rootNode);
    if (self.componentDidUpdate) {
      self.componentDidUpdate();
    }
  }
}

function getChildren(self: LSCustomElement) {
  return Array.from(self.shadowRoot ? self.shadowRoot.children : self.children) as Element[];
}
