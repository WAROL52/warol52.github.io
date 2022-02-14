class Souris {
    constructor(elementHTML = document.querySelector('body')) {
        this.element = elementHTML;
        this.isclick = false;
        this.event = undefined;
        this.mx = 0
        this.my = 0
        this.init()
    }
    init() {
        this.element.addEventListener('mousemove', (event) => {
            //----------------------
            var rect = this.element.getBoundingClientRect();
            var mX = Math.floor(event.clientX - rect.left);
            var mY = Math.floor(event.clientY - rect.top);
            //------------------------
            this.mx = mX;
            this.my = mY;
            this.event = event;
        })
        this.element.addEventListener('mousedown', () => {
            this.isclick = true
        })
        this.element.addEventListener('mouseup', () => {
            this.isclick = false
        })
    }
    //----------------------------------------------------
    get isAltKeyPressed() {
        return this.event.altKey
    }
    get isCtrlKeyPressed() {
        return this.event.ctrlKey
    }
    get isShiftKeyPressed() {
        return this.event.shiftKey
    }
    get isMetaKeyPressed() {
        return this.event.metaKey
    }
    get isclicked() {
        return this.isclick
    };
    remove_event_listener(typeEvent, nomFonction) {
        this.element.removeEventListener(typeEvent, nomFonction);
    }
    //----------------------------------------
    event_mousemove(functionCallBack) {
        this.element.addEventListener('mousemove', functionCallBack)
    }
    event_click(functionCallBack) {
        this.element.addEventListener('click', functionCallBack, {
            once: true,
        })
    }
    event_mouseup(functionCallBack) {
        this.element.addEventListener('mouseup', functionCallBack)
    }
    event_mousedown(functionCallBack) {
        this.element.addEventListener('mousedown', functionCallBack)
    }
    event_dbclick(functionCallBack) {
        this.element.addEventListener('dblclick', functionCallBack)
    }
    get mouseX() {
        return this.mx
    }
    get mouseY() {
        return this.my
    }
}
