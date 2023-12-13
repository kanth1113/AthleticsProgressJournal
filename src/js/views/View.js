export default class View {
  _data;
  _parentElement;

  render(element = this._parentElement, location = "afterbegin") {
    const html = this._generateHTML();
    this.clear(element);
    element.insertAdjacentHTML(location, html);
  }

  renderAdd(element = this._parentElement, location = "afterbegin") {
    const html = this._generateHTML();
    element.insertAdjacentHTML(location, html);
  }

  clear(element = this._parentElement) {
    element.innerHTML = "";
  }
}
