import type { LsStaticAttributesType } from '../types';

export function initLsStatic(ls: LsStaticAttributesType): LsStaticAttributesType {
	if (ls) {
		return ls;
	} else {
		return {
			stores: [],
			elements: [],
			observedAttributes: [],
			eventsDispatchers: []
		};
	}
}