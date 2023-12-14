export default class View {
  _data;
  _parentElement;

  render(data = {}, location = "afterbegin") {
    this._data = data;
    const html = this._generateHTML();
    this.clear(this._parentElement);
    this._parentElement.insertAdjacentHTML(location, html);
  }

  renderAdd(data = {}, location = "afterbegin") {
    this._data = data;
    const html = this._generateHTML();
    this._parentElement.insertAdjacentHTML(location, html);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
