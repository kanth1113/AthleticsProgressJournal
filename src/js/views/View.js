export default class View {
  _data;
  _parentElement;

  render() {
    const html = this._generateHTML(this._data);
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderAdd() {
    const html = this._generateHTML(this._data);
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
