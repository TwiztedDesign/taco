export default class VideoStream extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = '<video></video>';
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return ['result','mode', 'minValueX', 'minValueY', 'maxValueX', 'maxValueY', 'precision'];
    }

    attributeChangedCallback() {

    }

    get group() {
        return this.getAttribute("group");
    }
    get stream() {
        return this._streamId;
    }


    expose(){
        return {
            group  : 'groupId',
            stream : 'streamId'
        };
    }

}