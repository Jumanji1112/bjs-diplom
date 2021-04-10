 'use strict'
//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout (response => {
	if (response.success == true) {
		location.reload();
	}
});

//Получение информации о пользователе
ApiConnector.current(response => {
	if (response.success == true) {
		ProfileWidget.showProfile(response.data);
	}
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function requestCourses() {
	ApiConnector.getStocks(response =>{
		if (response.success == true) {
			ratesBoard.clearTable();
		};
		ratesBoard.fillTable(response.data);
	})
};
setInterval (requestCourses(), 60000);

//Операции с деньгами
const moneyManager =new MoneyManager();
//пополнение баланса
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, response => {
	if (response.success == true) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage (response.success, "Счет пополнен.");
	} else {
		moneyManager.setMessage (response.success, response.error);
	}
});
//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response =>{
	if (response.success == true) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage (response.success, "Конвертация прошла успешно");
	} else {
		moneyManager.setMessage (response.success, response.error);
	}
});
//перевод валюты
moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney (data, response =>{
	if (response.success == true) {
		ProfileWidget.showProfile(response.data);
		moneyManager.setMessage (response.success, "Перевод денег прошел успешно");
	} else {
		moneyManager.setMessage (response.success, response.error);
	}
});

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
//начальный список избранного
ApiConnector.getFavorites (response => {
	if (response.success == true) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable (response.data);
		moneyManager.updateUsersList(response.data);
	} 	
});
//добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
	if (response.success == true) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable (response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь добавлен");
	} else {
		favoritesWidget.setMessage(response.success, response.error);
	}
});
//удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
	if (response.success == true) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable (response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(response.success, "Пользователь удален");
	} else {
		favoritesWidget.setMessage(response.success, response.error);
	}
});
