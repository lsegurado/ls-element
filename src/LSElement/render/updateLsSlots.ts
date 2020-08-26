import { LSCustomElement } from '../types';
import { isCustomElementWithoutShadowRoot } from '../utils/isCustomElementWithoutShadowRoot';

export function updateLsSlots(self: LSCustomElement) {
  if (isCustomElementWithoutShadowRoot(self)) {
    self.ls = self.ls || {};
    self.ls.slot = self.ls.slot || {};
    Array.from(self.children).forEach(child => {
      const slotName: string = child.getAttribute('slot') || 'default';
      self.ls.slot[slotName] = self.ls.slot[slotName] || [];
      self.ls.slot[slotName].push(child);
      self.removeChild(child);
    });
  }
}