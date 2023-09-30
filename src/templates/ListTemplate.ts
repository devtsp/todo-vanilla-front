import FullList from '../model/FullList';
import ListItem from '../model/ListItem';

interface DOMList {
	ul: HTMLUListElement;
	clear(): void;
	render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
	static instance: ListTemplate = new ListTemplate();
	private _ul: HTMLUListElement = document.getElementById(
		'itemList'
	) as HTMLUListElement;

	constructor() {}

	clear(): void {
		this._ul.replaceChildren();
	}

	render(fullList: FullList): void {
		this.clear();
		fullList.list.forEach((listItem: ListItem) => {
			// item
			const newLi = document.createElement('li') as HTMLLIElement;
			newLi.className = 'item';

			// checkbox selector
			const checkBox = document.createElement('input') as HTMLInputElement;
			checkBox.className = 'checkbox';
			checkBox.type = 'checkbox';
			checkBox.id = listItem.id;
			checkBox.checked = listItem.checked;
			newLi.appendChild(checkBox);
			checkBox.addEventListener('change', () => {
				listItem.checked = !listItem.checked;
				fullList.save();
				checkBox.checked = !checkBox.checked;
				this.render(fullList);
			});

			// item description
			const itemLabel = document.createElement('label') as HTMLLabelElement;
			itemLabel.className = 'description';
			itemLabel.htmlFor = listItem.id;
			itemLabel.textContent = listItem.item;
			newLi.appendChild(itemLabel);

			// remove button
			const button = document.createElement('button') as HTMLButtonElement;
			button.className = 'deleteButton';
			button.textContent = '❌';
			newLi.appendChild(button);
			button.addEventListener('click', () => {
				fullList.removeItem(listItem.id);
				this.render(fullList);
			});

			this._ul.appendChild(newLi);
		});
	}

	get ul() {
		return this._ul;
	}
}
