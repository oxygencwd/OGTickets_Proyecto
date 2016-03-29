angular.module('OGTicketsApp.services')
.service('serviceSiteRegister', [, function() {

	var sites= angular.fromJson(localStorage.getItem("sites")) || [];

	var getAll= function(){
		return sites;
	};

	var updateStorage= function(){
		localStorage.setItem('sites', JSON.stringify(sites));
	};

	var getId= function () {
			var id= Number(localStorage.getItem("siteId")) || 1;
			return id;
	};

	var updateId= function () {
			var newId= (getId())+1;
			localStorage.setItem("siteId", newId);
	};

	var getTransactCount = function () {
			var id= Number(localStorage.getItem("transactCount")) || 1;
			return id;
	};

	var updateTransactCount= function () {
			var newId= (getTransactCount())+1;
			localStorage.setItem("transactCount", newId);
	};

	var saveSite= function (siteObject) {
			siteObject.id= getId();
			siteObject.transac=[];
			siteObject.getTransact= function () {
				return siteObject.transac;
			}
			sites.push(siteObject);
			updateStorage();
			updateId();
	};

	return{
		saveSite: saveSite,
		updateTransactCount: updateTransactCount,
		getTransactCount: getTransactCount
	};

}]);




