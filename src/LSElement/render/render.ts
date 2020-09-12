import type { LSCustomElement } from '../types';
import { isCustomElementWithoutShadowRoot } from '../utils/isCustomElementWithoutShadowRoot';
import { validateElement } from './validateElement';

export function render(self: LSCustomElement) {
  const renderResult = self.render();
  if (renderResult) {
    const renderResultAsArray = !Array.isArray(renderResult) ? [renderResult] : renderResult;
    const isACustomBuiltInElement = isCustomElementWithoutShadowRoot(self);
    return processArray(renderResultAsArray, self, isACustomBuiltInElement);
  } return undefined;
}

function processArray(arrayResult: Array<any>, self: LSCustomElement, isACustomBuiltInElement: boolean) {
  const result = new Array<Element>();
  for (let i = 0; i < arrayResult.length; i++) {
    const x = arrayResult[i];
    if (x) {
      if (Array.isArray(x)) {
        result.push(...processArray(x, self, isACustomBuiltInElement));
      } else {
        if (!validateElement(x, result)) {
          continue;
        }
        result.push(x);
      }
    }
  }
  return result;
}