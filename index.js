define(function (require) {
	// load data.js containing sample datasources
	var data = require('data');
	var jquery = require('jquery');

	// helper function for browser console
	var log = function () {
		if (window.console && window.console.log) {
			var args = Array.prototype.slice.call(arguments);
			window.console.log.apply(console, args);
		}
	};

	// programmatically injecting this is so much easier than writing the html by hand 376 times...
	$('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], dt[id], section[id]').each(function (i) {
		$(this).children('h2:first').prepend(['<a class="header-anchor" href="#', this.id, '"><small><span class="glyphicon glyphicon-link"></span></a></small> '].join(''));
	});

	// load fuel controls
	require('fuelux/all');

	var _ = require('underscore');
	var hbs = require('hbs');


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 CHECKBOX
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// sample method buttons
	$('#btnCheckboxToggle').on('click', function () {
		$('#myCustomCheckbox1').checkbox('toggle');
	});
	$('#btnCheckboxDisable').on('click', function () {
		$('#myCustomCheckbox1').checkbox('disable');
	});
	$('#btnCheckboxEnable').on('click', function () {
		$('#myCustomCheckbox1').checkbox('enable');
	});
	$('#btnCheckboxDestroy').on('click', function () {
		var $container = $('#myCustomCheckbox1').parent();
		var markup = $('#myCustomCheckbox1').checkbox('destroy');
		log(markup);
		$container.append(markup);
	});
	$('#btnCheckboxIsChecked').on('click', function () {
		var checked = $('#myCustomCheckbox1').checkbox('isChecked');
		log(checked);
	});
	$('#btnCheckboxGetValue').on('click', function () {
		var value = $('#myCustomCheckbox1').checkbox('getValue');
		log(value);
	});
	$('#btnCheckboxCheck').on('click', function () {
		$('#myCustomCheckbox1').checkbox('check');
	});
	$('#btnCheckboxUncheck').on('click', function () {
		$('#myCustomCheckbox1').checkbox('uncheck');
	});

	$('#myCustomCheckbox1').on('changed.fu.checkbox', function (evt, data) {
		log('changed', data);
	});
	$('#myCustomCheckbox1').on('checked.fu.checkbox', function (evt, data) {
		log('checked');
	});
	$('#myCustomCheckbox1').on('unchecked.fu.checkbox', function (evt, data) {
		log('unchecked');
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 COMBOBOX
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	$('#myCombobox').combobox({
		filterOnKeypress: true,
		showOptionsOnKeypress: true
	});

	// sample method buttons
	$('#btnComboboxGetSelectedItem').on('click', function () {
		var selectedItem = $('#myCombobox').combobox('selectedItem');
		log('selectedItem: ', selectedItem);
	});
	$('#btnComboboxSelectByValue').on('click', function () {
		$('#myCombobox').combobox('selectByValue', '1');
	});
	$('#btnComboboxSelectByIndex').on('click', function () {
		$('#myCombobox').combobox('selectByIndex', '1');
	});
	$('#btnComboboxSelectByText').on('click', function () {
		$('#myCombobox').combobox('selectByText', 'Four');
	});
	$('#btnComboboxSelectBySelector').on('click', function () {
		$('#myCombobox').combobox('selectBySelector', 'li[data-fizz=buzz]');
	});
	$('#btnComboboxDisable').on('click', function () {
		$('#myCombobox').combobox('disable');
	});
	$('#btnComboboxEnable').on('click', function () {
		$('#myCombobox').combobox('enable');
	});
	$('#btnComboboxDestroy').on('click', function () {
		var markup = $('#myCombobox').combobox('destroy');
		log(markup);
		$(this).closest('.section').append(markup);
	});

	// events
	$('#myCombobox').on('changed.fu.combobox', function (event, data) {
		log(data);
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 DATEPICKER
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	function formatClientTimezone8601 () {
		var now = new Date(),
			tzo = now.getTimezoneOffset() * -1, // invert
			dif = tzo >= 0 ? '+' : '-',
			pad = function (num) {
				var norm = Math.abs(Math.floor(num));
				return (norm < 10 ? '0' : '') + norm;
			};
		return dif + pad(tzo / 60) + ':' + pad(tzo % 60);
	}

	var localTimezone = formatClientTimezone8601();

	// initialize
	$('#myDatepicker').datepicker({
		momentConfig: {
			culture: 'en',
			format: ''
		},
		allowPastDates: true,
		restricted: [{
			from: '2014-08-10T00:00:00' + localTimezone,
			to: '2014-08-15T00:00:00' + localTimezone
		}]
	});

	// sample method buttons
	$('#btnDatepickerEnable').on('click', function () {
		$('#myDatepicker').datepicker('enable');
	});
	$('#btnDatepickerDisable').on('click', function () {
		$('#myDatepicker').datepicker('disable');
	});
	$('#btnDatepickerLogFormattedDate').on('click', function () {
		log($('#myDatepicker').datepicker('getFormattedDate'));
	});
	$('#btnDatepickerLogDateObj').on('click', function () {
		log($('#myDatepicker').datepicker('getDate'));
	});
	$('#btnDatepickerSetDate').on('click', function () {
		var futureDate = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000));
		$('#myDatepicker').datepicker('setDate', futureDate);
		log($('#datepicker').datepicker('getDate'));
	});
	$('#btnDatepickerDestroy').on('click', function () {
		var $container = $('#myDatepicker').parent();
		var markup = $('#myDatepicker').datepicker('destroy');
		log(markup);
		$container.append(markup);
	});

	// events
	$('#myDatepicker').on('changed.fu.datepicker', function (event, data) {
		log('datepicker change event fired: ' + data);
	});

	$('#myDatepicker').on('dateClicked.fu.datepicker', function (event, data) {
		log('datepicker dateClicked event fired: ' + data);
	});

	$('#myDatepicker').on('inputParsingFailed.fu.datepicker', function () {
		log('datepicker inputParsingFailed event fired');
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 INFINITE SCROLL
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// intitialize
	function initMyInfiniteScroll1 () {
		$('#myInfiniteScroll1').infinitescroll({
			dataSource: function (helpers, callback) {
				log('helpers variables', helpers);

				// call and simulate latency
				setTimeout(function () {
					// from data.js
					callback({
						content: data.infiniteScroll.content
					});
				}, data.infiniteScroll.delays[Math.floor(Math.random() * 4)]);
			}
		});

	}
	initMyInfiniteScroll1();

	var infiniteScrollCount = 0;
	$('#myInfiniteScroll2').infinitescroll({
		dataSource: function (helpers, callback) {
			log('helpers variables', helpers);

			setTimeout(function () {
				var resp = {};
				infiniteScrollCount++;
				// from data.js
				resp.content = data.infiniteScroll.content;
				if (infiniteScrollCount >= 5) {
					resp.end = true;
				}

				callback(resp);
			}, data.infiniteScroll.delays[Math.floor(Math.random() * 4)]);
		},
		hybrid: true
	});

	// sample method buttons
	$('#btnInfiniteScrollEnable').on('click', function () {
		$('#myInfiniteScroll1').infinitescroll('enable');
	});
	$('#btnInfiniteScrollDisable').on('click', function () {
		$('#myInfiniteScroll1').infinitescroll('disable');
	});
	$('#btnInfiniteScrollDestroy').on('click', function () {
		var $container = $('#myInfiniteScroll1').parent();
		var markup = $('#myInfiniteScroll1').infinitescroll('destroy');
		log(markup);
		$container.append(markup);
		$('#myInfiniteScroll1').append($('#myInfiniteScroll2').html());
		initMyInfiniteScroll1();
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 LOADER
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// sample method buttons
	$('#btnLoaderPlay').on('click', function () {
		$('#myLoader1').loader('play');
	});
	$('#btnLoaderPause').on('click', function () {
		$('#myLoader1').loader('pause');
	});
	$('#btnLoaderNext').on('click', function () {
		$('#myLoader1').loader('next');
	});
	$('#btnLoaderPrevious').on('click', function () {
		$('#myLoader1').loader('previous');
	});
	$('#btnLoaderDestroy').on('click', function () {
		var $container = $('#myLoader1').parent();
		var markup = $('#myLoader1').loader('destroy');
		log(markup);
		$container.append(markup);
		$('#myLoader1').loader();
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 PILLBOX
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// intitialize
	$('#myPillbox1').pillbox({
		edit: true,
		onKeyDown: function (inputData, callback) {
			log('inputData:', inputData);

			callback({
				data: [
					{
						'text': 'African cherry orange',
						'value': 'african cherry orange',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: orange;',
							'data-example-attribute': 'true'
						},
						'data': {
							'flora': true,
							'color': 'orange'
						}
					},
					{
						'text': 'Bilberry',
						'value': 'bilberry',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: midnightBlue;',
							'data-example-attribute': 'true'
						},
						'data': {
							'flora': true,
							'color': 'blue'
						}
					},
					{
						'text': 'Ceylon gooseberry',
						'value': 'ceylon gooseberry',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: mediumBlue;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': "Dead Man's Fingers",
						'value': "dead man's fingers",
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: darkSlateBlue;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Governor’s Plum',
						'value': 'governor’s plum',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: darkViolet;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Huckleberry',
						'value': 'huckleberry',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: darkBlue;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Jackfruit',
						'value': 'jackfruit',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: yellow;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Lillypilly',
						'value': 'lillypilly',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: pink;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Soursop',
						'value': 'soursop',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: beige;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Thimbleberry',
						'value': 'thimbleberry',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: Crimson;',
							'data-example-attribute': 'true'
						}
					},
					{
						'text': 'Wongi',
						'value': 'wongi',
						'attr': {
							'cssClass': 'example-pill-class',
							'style': 'background-color: red;',
							'data-example-attribute': 'true'
						}
					},
				]
			});
		}
	});
	$('#myPillbox2').pillbox({
		truncate: true
	});

	// sample method buttons
	$('#btnPillboxEnable').click(function () {
		$('#myPillbox1').pillbox('enable');
	});
	$('#btnPillboxDisable').click(function () {
		$('#myPillbox1').pillbox('disable');
	});
	$('#btnPillboxAdd').click(function () {
		var newItemCount = $('#myPillbox1 ul li').length + 1;
		var randomBackgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		$('#myPillbox1').pillbox('addItems',
			{
				'text': 'item ' + newItemCount,
				'value': 'item' + newItemCount,
				'attr': {
					'cssClass': 'example-pill-class',
					'style': 'background-color:' + randomBackgroundColor + ';',
					'data-example-attribute': 'true'
				}
			});
	});
	$('#btnPillboxRemoveByValue').click(function () {
		$('#myPillbox1').pillbox('removeByValue', 'item 2');
	});
	$('#btnPillboxRemoveBySelector').click(function () {
		$('#myPillbox1').pillbox('removeBySelector', '.example-pill-class');
	});
	$('#btnPillboxRemoveByText').click(function () {
		$('#myPillbox1').pillbox('removeByText', 'item 3');
	});
	$('#btnPillboxItems').click(function () {
		var items = $('#myPillbox1').pillbox('items');
		log('items: ', items);
	});
	$('#btnPillboxDestroy').click(function () {
		var $container = $('#myPillbox1').parents('.thin-box:first');
		var markup = $('#myPillbox1').pillbox('destroy');
		log(markup);
		$container.append(markup);
		$('#myPillbox1').pillbox({
			edit: true
		});
	});

	// events
	$('#myPillbox1').on('added', function (event, pillData) {
		log('pillbox added', pillData);
	});
	$('#myPillbox1').on('removed', function (event, pillData) {
		log('pillbox removed', pillData);
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 PLACARD
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// sample method buttons
	$('#btnPlacardEnable').click(function () {
		$('#myPlacard1').placard('enable');
	});
	$('#btnPlacardDisable').click(function () {
		$('#myPlacard1').placard('disable');
	});
	$('#btnPlacardDestroy').click(function () {
		var $container = $('#myPlacard1').parent();
		var markup = $('#myPlacard1').placard('destroy');
		log(markup);
		$container.append(markup);
		$('#myPlacard1').placard({
			edit: true
		});
	});

	$('#myPlacard3').on('accepted.fu.placard', function () {
		console.log('accepted.fu.placard');
	});

	$('#myPlacard3').on('cancelled.fu.placard', function () {
		console.log('cancelled.fu.placard');
	});

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 RADIO
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// sample method buttons
	$('#btnRadioDisable').on('click', function () {
		console.log('in disable');
		$('#myCustomRadio1').radio('disable');
	});
	$('#btnRadioEnable').on('click', function () {
		$('#myCustomRadio1').radio('enable');
	});
	$('#btnRadioDestroy').on('click', function () {
		var $container = $('#myCustomRadio1').parent();
		var markup = $('#myCustomRadio1').radio('destroy');
		log(markup);
		$container.append(markup);
	});
	$('#btnRadioIsChecked').on('click', function () {
		var checked = $('#myCustomRadio1').radio('isChecked');
		log(checked);
	});
	$('#btnRadioCheck').on('click', function () {
		$('#myCustomRadio1').radio('check');
	});
	$('#btnRadioUncheck').on('click', function () {
		$('#myCustomRadio1').radio('uncheck');
	});


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	 REPEATER
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// intitialize
// function initRepeater () {
// 	// simulate network latency
// 	var loadDelays = ['300', '600', '900', '1200'];
// 	var sort = function (data, sortProperty, sortDirection) {
// 		var sortedData = _.sortBy(data, function (item) {
// 			return item[sortProperty];
// 		});

// 		// sort direction
// 		if (sortDirection === 'desc') {
// 			sortedData = sortedData.reverse();
// 		}

// 		return sortedData;
// 	};

// 	// list view setup
// 	var list = function (options, callback) {
// 		// build dataSource based with options
// 		var resp = {
// 			count: data.repeater.listData.length,
// 			items: [],
// 			page: options.pageIndex
// 		};

// 		// get start and end limits for JSON
// 		var i, l;
// 		resp.pages = Math.ceil(resp.count / (options.pageSize || 50));

// 		i = options.pageIndex * (options.pageSize || 50);
// 		l = i + (options.pageSize || 50);
// 		l = (l <= resp.count) ? l : resp.count;
// 		resp.start = i + 1;
// 		resp.end = l;

// 		// setup columns for list view
// 		resp.columns = [
// 			{
// 				label: 'Common Name',
// 				property: 'commonName',
// 				sortable: true,
// 				width: 600
// 			},
// 			{
// 				label: 'Latin Name',
// 				property: 'latinName',
// 				sortable: true,
// 				width: 600
// 			},
// 			{
// 				label: 'Appearance',
// 				property: 'appearance',
// 				sortable: true
// 			},
// 			{
// 				label: 'Sound',
// 				property: 'sound',
// 				sortable: true
// 			}
// 		];

// 		// add sample items to datasource
// 		for (i; i < l; i++) {
// 			// from data.js
// 			resp.items.push(data.repeater.listData[i]);
// 		}

// 		resp.items = sort(resp.items, options.sortProperty, options.sortDirection);

// 		// call and simulate latency
// 		setTimeout(function () {
// 			callback(resp);
// 		}, loadDelays[Math.floor(Math.random() * 4)]);
// 	};


// 	// thumbnail view setup
// 	var thumbnail = function (options, callback) {
// 		var sampleImageCategories = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nature', 'technics', 'transport'];
// 		var numItems = 200;

// 		// build dataSource based with options
// 		var resp = {
// 			count: numItems,
// 			items: [],
// 			pages: (Math.ceil(numItems / (options.pageSize || 30))),
// 			page: options.pageIndex
// 		};

// 		// get start and end limits for JSON
// 		var i, l;
// 		i = options.pageIndex * (options.pageSize || 30);
// 		l = i + (options.pageSize || 30);
// 		resp.start = i + 1;
// 		resp.end = l;

// 		// add sample items to datasource
// 		for (i; i < l; i++) {
// 			resp.items.push({
// 				name: ('Thumbnail ' + (i + 1)),
// 				src: 'http://lorempixel.com/65/65/' + sampleImageCategories[Math.floor(Math.random() * 9)] + '/?_=' + i
// 			});
// 		}

// 		// call and simulate latency
// 		setTimeout(function () {
// 			callback(resp);
// 		}, loadDelays[Math.floor(Math.random() * 4)]);
// 	};

// 	// initialize repater
// 	$('#myRepeater').repeater({
// 		searchOnKeyPress: true,
// 		dataSource: function (options, callback) {
// 			if (options.view === 'list') {
// 				list(options, callback);
// 			} else if (options.view === 'thumbnail') {
// 				thumbnail(options, callback);
// 			}
// 		},
// 		list_noItemsHTML: 'no items found',
// 		thumbnail_noItemsHTML: 'no items found',
// 		views: {
// 			'list.list': {
// 				dataSource: function (options, callback) {
// 					list(options, callback);
// 				},
// 			},
// 			'thumbnail': {
// 				dataSource: function (options, callback) {
// 					thumbnail(options, callback);
// 				},
// 				thumbnail_infiniteScroll: {
// 					hybrid: true
// 				}
// 			},
// 			'list.frozen': {
// 				dataSource: function (options, callback) {
// 					list(options, callback);
// 				},
// 				list_selectable: false, // (single | multi)
// 				list_frozenColumns: 1
// 			}
// 		}
// 	});
// }
// initRepeater();

// // sample method buttons
// $('#btnRepeaterEnable').on('click', function () {
// 	$('#myRepeater').repeater('enable');
// });
// $('#btnRepeaterDisable').on('click', function () {
// 	$('#myRepeater').repeater('disable');
// });
// $('#btnRepeaterDestroy').on('click', function () {
// 	var $container = $('#myRepeater').parent();
// 	var markup = $('#myRepeater').repeater('destroy');
// 	log(markup);
// 	$container.append(markup);

// 	initRepeater();
// });

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 REPEATER w/ actions
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// function initRepeaterActions () {
// 	var loadDelays = ['300', '600', '900', '1200'];

// 	var sort = function (data, sortProperty, sortDirection) {
// 		var sortedData = _.sortBy(data, function (item) {
// 			return item[sortProperty];
// 		});

// 		// sort direction
// 		if (sortDirection === 'desc') {
// 			sortedData = sortedData.reverse();
// 		}

// 		return sortedData;
// 	};

// 	function getSampleDataSet (options, callback) {
// 		var resp = {
// 			count: data.repeater.listData.length,
// 			items: [],
// 			page: options.pageIndex
// 		};

// 		// get start and end limits for JSON
// 		var i, l;
// 		resp.pages = Math.ceil(resp.count / (options.pageSize || 50));

// 		i = options.pageIndex * (options.pageSize || 50);
// 		l = i + (options.pageSize || 50);
// 		l = (l <= resp.count) ? l : resp.count;
// 		resp.start = i + 1;
// 		resp.end = l;

// 		// setup columns for list view
// 		resp.columns = [
// 			{
// 				label: 'Common Name',
// 				property: 'commonName',
// 				sortable: true
// 			},
// 			{
// 				label: 'Latin Name',
// 				property: 'latinName',
// 				sortable: true
// 			},
// 			{
// 				label: 'Appearance',
// 				property: 'appearance',
// 				sortable: true
// 			},
// 			{
// 				label: 'Sound',
// 				property: 'sound',
// 				sortable: true
// 			}
// 		];

// 		// add sample items to datasource
// 		for (i; i < l; i++) {
// 			// from data.js
// 			resp.items.push(data.repeater.listData[i]);
// 		}

// 		resp.items = sort(resp.items, options.sortProperty, options.sortDirection);

// 		// call and simulate latency
// 		setTimeout(function () {
// 			callback(resp);
// 		}, loadDelays[Math.floor(Math.random() * 4)]);

// 	}

// 	// initialize the repeater
// 	var repeaterActions = $('#myRepeaterActions');
// 	repeaterActions.repeater({
// 		list_noItemsHTML: '<span>foo</span>',
// 		list_highlightSortedColumn: true,
// 		list_selectable: 'multi',
// 		list_actions: {
// 			width: 37,
// 			items: [
// 				{
// 					name: 'edit',
// 					html: '<span class="glyphicon glyphicon-pencil"></span> Edit'
// 				},
// 				{
// 					name: 'copy',
// 					html: '<span class="glyphicon glyphicon-copy"></span> Copy'
// 				},
// 				{
// 					name: 'delete',
// 					html: '<span class="glyphicon glyphicon-trash"></span> Delete',
// 					clickAction: function (helpers, callback, e) {
// 						console.log('hey it worked');
// 						console.log(helpers);
// 						e.preventDefault();
// 						callback();
// 					}
// 				}
// 			]
// 		},
// 		// setup your custom datasource to handle data retrieval;
// 		// responsible for any paging, sorting, filtering, searching logic
// 		dataSource: getSampleDataSet
// 	});
// }
// initRepeaterActions();

// $('#btnRepeaterLogValue').on('click', function () {
// 	console.log($('#myRepeaterActions').repeater('getValue'));
// });


		// -- BEGIN MODULE CODE HERE --

if ( $.fn.repeater ) {
	$.fn.repeater.staticDataSource = function( columns, data ) {
		var dataset = data;

		var sort = function( data, sortProperty, sortDirection ) {
			var sortedData = _.sortBy( data, function( item ) {
				return item[ sortProperty ];
			} );

			// sort direction
			if ( sortDirection === 'desc' ) {
				sortedData = sortedData.reverse();
			}

			return sortedData;
		};

		var filter = function( data, filter ) {
			var filteredData;

			if ( filter === 'all' || filter.value === 'all' ) {
				// return data;
			} else if ( filter.property ) {
				// simple filter
				filteredData = _.filter( data, function( item ) {
					return item[ filter.property ] === filter.value;
				} );
				return filteredData;
			} else {
				// advanced filter
				filteredData = _.filter( data, function( item ) {
					var match = true;
					for ( var key in filter ) {
						if ( item[ key ] !== filter[ key ] ) {
							match = false;
							break;
						}
					}
					return match;
				} );

				return filteredData;
			}
		};

		var search = function( data, search ) {
			var searchedData = [];
			var searchTerm = search.toLowerCase();

			_.each( data, function( item ) {
				var values = _.values( item );
				var found = _.find( values, function( val ) {

					if ( val.toString().toLowerCase().indexOf( searchTerm ) > -1 ) {
						searchedData.push( item );
						return true;
					}
				} );
			} );

			return searchedData;
		};

		var delay = function() {
			var min = 200; // 200 milliseconds
			var max = 1000; // 1 second

			// random delay interval
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		};

		this.getData = function( options, callback ) {
			var pageIndex = options.pageIndex;
			var pageSize = options.pageSize;
			var view = options.view;
			var viewColumns = columns;

			if ( columns[ view ] ) {
				// if columns vary by view
				viewColumns = columns[ view ];
			}

			// sort by
			var rows = sort( dataset, options.sortProperty, options.sortDirection );

			// filter
			rows = filter( rows, options.filter );

			// search
			if ( options.search && options.search.length > 0 ) {
				rows = search( rows, options.search );
			}

			var totalItems = rows.length;
			var totalPages = Math.ceil( totalItems / pageSize );
			var startIndex = ( pageIndex * pageSize ) + 1;
			var endIndex = ( startIndex + pageSize ) - 1;
			if ( endIndex > rows.length ) {
				endIndex = rows.length;
			}

			rows = rows.slice( startIndex - 1, endIndex );

			var dataSource = {
				page: pageIndex,
				pages: totalPages,
				count: totalItems,
				start: startIndex,
				end: endIndex,
				columns: viewColumns,
				items: rows
			};

			// simulate delay
			window.setTimeout( function() {
				callback( dataSource );
			}, delay() );
		};
	};
}


$.fn.repeater.staticDataSource = function(columns, data){
	var dataset = data;

	var sort = function(data, sortProperty, sortDirection) {
		var sortedData = _.sortBy(data, function(item) {
			return item[sortProperty];
		});

		// sort direction
		if (sortDirection === 'desc') {
			sortedData = sortedData.reverse();
		}

		return sortedData;
	};

	var filter = function(data, filter) {
		var filteredData;

		// if(filter === 'all' || filter.value === 'all') {
		if(filter === '' || filter.value === '') {
			return data;
		} else if(filter.property) {
			// simple filter
			filteredData = _.filter(data, function(item){
				return item[filter.property] === filter.value;
			});
			return filteredData;
		} else {
			// advanced filter
			filteredData = _.filter(data, function(item){
				var match = true;
				for (var key in filter) {
					if (item[key] !== filter[key]) {
						match = false;
						break;
					}
				}
				return match;
			});

			return filteredData;
		}
	};

	var search = function(data, search) {
		var searchedData = [];
		var searchTerm = search.toLowerCase();

		_.each(data, function(item) {
			var values = _.values(item);
			var found = _.find(values, function(val) {

				if(val.toString().toLowerCase().indexOf(searchTerm) > -1) {
					searchedData.push(item);
					return true;
				}
			});
		});

		return searchedData;
	};

	var delay = function() {
		var min = 200;  // 200 milliseconds
		var max = 1000; // 1 second

		// random delay interval
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	this.getData = function(options, callback) {
		var pageIndex = options.pageIndex;
		var pageSize = options.pageSize;
		var view = options.view;
		var viewColumns = columns;

		if(columns[view]) {
			// if columns vary by view
			viewColumns = columns[view];
		}

		// sort by
		var rows = sort(dataset, options.sortProperty, options.sortDirection);

		// filter
		rows = filter(rows, options.filter);

		// search
		if (options.search && options.search.length > 0) {
			rows = search(rows, options.search);
		}

		var totalItems = rows.length;
		var totalPages = Math.ceil(totalItems / pageSize);
		var startIndex = (pageIndex * pageSize) + 1;
		var endIndex = (startIndex + pageSize) - 1;
		if(endIndex > rows.length) {
			endIndex = rows.length;
		}

		rows = rows.slice(startIndex-1, endIndex);


		var dataSource = {
			page: pageIndex,
			pages: totalPages,
			count: totalItems,
			start: startIndex,
			end: endIndex,
			columns: viewColumns,
			items: rows
		};

		console.log(dataSource);


		// simulate delay
		window.setTimeout(function () {
			callback(dataSource);
		}, delay());
	};
};


// Demonstrates bug where the list_actions do not appear if the repeater is first loaded with no entries, choose status "draft" from the filter and see that the list_actions do not appear on the right side of the repeater

function getSampleDataSet() {
	var items = [];
	var statuses = ['archived', 'active', 'draft'];
	var categories = ['category1', 'category2', 'category3'];
	function getRandomStatus() {
		var min = 0;
		var max = 2;
		var index = Math.floor(Math.random() * (max - min + 1)) + min;
		return statuses[index];
	}
	function getRandomCategory() {
		var min = 0;
		var max = 2;
		var index = Math.floor(Math.random() * (max - min + 1)) + min;
		return categories[index];
	}

	for(var i=1; i<=100; i++) {
		var item = {
			id: i,
			name: 'item ' + i,
			key: 'key ' + i,
			description: 'desc ' + i,
			status: getRandomStatus(),
			category: getRandomCategory()
		};
		items.push(item);
	}

	return items;
}

// define the columns in your datasource
var columns = [
	{
		label: 'Name &amp; Description',
		property: 'name',
		sortable: true,
		sortDirection: 'asc'
	},
	{
		label: 'Key',
		property: 'key',
		sortable: true
	},
	{
		label: 'Status',
		property: 'status',
		sortable: true
	},
	{
		label: 'Category',
		property: 'category',
		sortable: true
	}
];

// define the rows in your datasource
var items = getSampleDataSet();

// initialize data source with data
var customDataSource = new $.fn.repeater.staticDataSource(columns, items);

function customColumnRenderer(helpers, callback) {

	// determine what column is being rendered
	var column = helpers.columnAttr;

	// get all the data for the entire row
	var rowData = helpers.rowData;
	var customMarkup = '';

	// only override the output for specific columns.
	// will default to output the text value of the row item
	switch(column) {
		case 'name':
			// let's combine name and description into a single column
			customMarkup = '<div style="font-size:12px;">' + rowData.name + '</div><div class="small text-muted">' + rowData.description + '</div>';
			break;
		default:
			// otherwise, just use the existing text value
			customMarkup = helpers.item.text();
			break;
	}

	helpers.item.html(customMarkup);

	callback();
}

function customRowRenderer(helpers, callback) {
	// let's get the id and add it to the "tr" DOM element
	var item = helpers.item;
	item.attr('id', 'row' + helpers.rowData.id);

	callback();
}



// initialize the repeater
var repeater = $('#myRepeaterActions');
repeater.repeater({
	list_selectable: 'multi', // (single | multi)
	list_noItemsHTML: '<span>NO ITEMS HERE TO SEE</span>',
	list_highlightSortedColumn: true,

	// setup your custom datasource to handle data retrieval;
	// responsible for any paging, sorting, filtering, searching logic
	dataSource: customDataSource.getData,
	list_actions:  {
		width: 37,
		items: [
			{
				name: 'edit',
				html: '<span class="glyphicon glyphicon-pencil"></span> EditTest'
			},
			{
				name: 'copy',
				html: '<span class="glyphicon glyphicon-copy"></span> CopyTest'
			},
			{
				name: 'delete',
				html: '<span class="glyphicon glyphicon-trash"></span> DeleteTest',
				clickAction: function(helpers, callback) {
					console.log('hey it worked');
					console.log(helpers);
					callback();
				}
			}
		]
	}
});




});

