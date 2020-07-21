import { AutonomousCustomElement, Attribute, Property, h, Child, HTMLAttributes, EventDispatcher, CustomEventDispatcher, LSCustomElement } from '../..';
import style from './style.css';

@AutonomousCustomElement()
export class LsTestElement extends HTMLElement implements LSCustomElement {
	@Property({ reflect: true, onChange: 'onChangeXd' }) xd = 234;
	@Property() xdfg = { id: 123, text: 'asdfasdf' };
	@Property() arrayExample = [1, 2, 3, 4, 5, 6, 7, 8];
	@Attribute({ onChange: 'onChangeXD2' }) xd2: number = 1;
	@Child('xd') xdElement: HTMLHeadingElement;
	@Child('xd2') xd2Element: HTMLHeadingElement;
	@EventDispatcher() allAnimationsFinished: CustomEventDispatcher<string>;

	onChangeXd(_newValue, _oldValue) {
		// this.xdElement.textContent = newValue;
		// const event = new CustomEvent('allanimationsfinished', {
		//   detail: 'hola',
		//   bubbles: true,
		//   cancelable: false,
		// });
		// this.dispatchEvent(event);
		// this.allAnimationsFinished.dispatch('holaxd');

	}

	onChangeXD2(_newValue) {
		// this.xd2Element.textContent = newValue;
	}

	render() {
		return (
			<>
				<style id="style">{style}</style>
				<div id="parent_div">
					{/* <h1 id="xd" value={this.xd < 240 ? this.xd2 + this.xd : undefined} onClick={(_ev) => { this.xd++;  }}>{this.xd}</h1> */}
					<h1 id="xd" value={this.xd < 240 ? this.xd2 + this.xd : undefined} onClick={(_ev) => { this.xd++; this.arrayExample.push(this.xd); }}>{this.xd}</h1>

				</div>
				{this.xd > 256 ? <h1 id="<256">{'>256'}</h1> : undefined}
				{this.xd > 245 ? <h1 id="<245">{'>245'}</h1> : undefined}
				{this.xd < 236 ? <h1 id="<236">{'<236'}</h1> : undefined}
				{this.arrayExample.map(x => <h2 id={'example' + x}>{x}</h2>)}
				<h1 id="xd2">{this.xd2}</h1>
				<h1 id="xdfg" onClick={() => this.xdfg.text = 'hola'}>{this.xdfg.text}</h1>
			</>
		);
	}
}

declare global {
	export namespace JSX {
		interface IntrinsicElements {
			'ls-test-element': {
				xd2?: number;
				onAllAnimationsFinished?: (event: CustomEvent<string>) => void;
			} & HTMLAttributes;
		}
	}
}