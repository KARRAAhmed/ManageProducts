/*global QUnit*/

sap.ui.define([
	"opensap/manageproducts/ManageProducts/model/formatter",
	"opensap/manageproducts/ManageProducts/test/unit/helper/FakeI18nModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"

], function (formatter, FakeI18nModel) {
	"use strict";

	QUnit.module("Number unit");

	function numberUnitValueTestCase(assert, sValue, fExpectedNumber) {
		// Act
		var fNumber = formatter.numberUnit(sValue);

		// Assert
		assert.strictEqual(fNumber, fExpectedNumber, "The rounding was correct");
	}

	QUnit.test("Should round down a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.123", "3.12");
	});

	QUnit.test("Should round up a 3 digit number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "3.128", "3.13");
	});

	QUnit.test("Should round a negative number", function (assert) {
		numberUnitValueTestCase.call(this, assert, "-3", "-3.00");
	});

	QUnit.test("Should round an empty string", function (assert) {
		numberUnitValueTestCase.call(this, assert, "", "");
	});

	QUnit.test("Should round a zero", function (assert) {
		numberUnitValueTestCase.call(this, assert, "0", "0.00");
	});
	QUnit.module("Delivery", {
			setup: function () {
				var oControllerStub = {
					getModel: sinon.stub().withArgs("i18n").returns(new FakeI18nModel({
						formatterMailDelivery : "mail",
						formatterParcelDelivery : "parcel",
						formatterCarrierDelivery : "carrier"
					}))
				};
				this.fnIsolatedFormatter = formatter.delivery.bind(oControllerStub);
			},
			teardown: function () {
				this.fnIsolatedFormatter = null;
			}
		});


	QUnit.test("Should determine a mail method based on the weight of a product", function (assert) {
	
		

		assert.strictEqual(this.fnIsolatedFormatter("KG", 0.2), "mail");
		assert.strictEqual(this.fnIsolatedFormatter("G", 200), "mail");
	});

});