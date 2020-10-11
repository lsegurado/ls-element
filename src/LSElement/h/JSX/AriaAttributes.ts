export interface AriaAttributes {
    'aria-activedescendant': string;
    'aria-atomic': boolean | 'false' | 'true';
    'aria-autocomplete': 'none' | 'inline' | 'list' | 'both';
    'aria-busy': boolean | 'false' | 'true';
    'aria-checked': boolean | 'false' | 'mixed' | 'true';
    'aria-colcount': number;
    'aria-colindex': number;
    'aria-colspan': number;
    'aria-controls': string;
    'aria-current': boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-describedby': string;
    'aria-details': string;
    'aria-disabled': boolean | 'false' | 'true';
    'aria-dropeffect': 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    'aria-errormessage': string;
    'aria-expanded': boolean | 'false' | 'true';
    'aria-flowto': string;
    'aria-grabbed': boolean | 'false' | 'true';
    'aria-haspopup': boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-hidden': boolean | 'false' | 'true';
    'aria-invalid': boolean | 'false' | 'true' | 'grammar' | 'spelling';
    'aria-keyshortcuts': string;
    'aria-label': string;
    'aria-labelledby': string;
    'aria-level': number;
    'aria-live': 'off' | 'assertive' | 'polite';
    'aria-modal': boolean | 'false' | 'true';
    'aria-multiline': boolean | 'false' | 'true';
    'aria-multiselectable': boolean | 'false' | 'true';
    'aria-orientation': 'horizontal' | 'vertical';
    'aria-owns': string;
    'aria-placeholder': string;
    'aria-posinset': number;
    'aria-pressed': boolean | 'false' | 'mixed' | 'true';
    'aria-readonly': boolean | 'false' | 'true';
    'aria-relevant': 'additions' | 'additions text' | 'all' | 'removals' | 'text';
    'aria-required': boolean | 'false' | 'true';
    'aria-roledescription': string;
    'aria-rowcount': number;
    'aria-rowindex': number;
    'aria-rowspan': number;
    'aria-selected': boolean | 'false' | 'true';
    'aria-setsize': number;
    'aria-sort': 'none' | 'ascending' | 'descending' | 'other';
    'aria-valuemax': number;
    'aria-valuemin': number;
    'aria-valuenow': number;
    'aria-valuetext': string;
}