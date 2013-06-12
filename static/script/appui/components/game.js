require.def("sudoku/appui/components/game",
	[
		"antie/widgets/component",
		"antie/widgets/label",
		"antie/widgets/grid",
		"antie/widgets/button",
		"antie/widgets/container",
		"antie/events/keyevent",
		"sudoku/appui/components/numberselector",
		"sudoku/lib/sudoku"
	],
	function (Component, Label, Grid, Button, Container, KeyEvent, NumberSelector) {
		return Component.extend({
			init: function () {
				var self = this;

				this._super("game");

				this.appendChildWidget(new Label("title", "Sudoku on TAL"));

				this._gameGrid = new Grid("gamegrid", 9, 9);

				for(var row = 0; row < 9; row++) {
					for(var col = 0; col < 9; col++) {
						var square = new Container();
						var button = new Button();

						square._row = row;
						square._col = col;

						button.appendChildWidget(new Label("label_" + row + "_" + col, "&nbsp"));

						square.appendChildWidget(button);

						this._gameGrid.setWidgetAt(col, row, square);
					}
				}

				this.appendChildWidget(this._gameGrid);

				this._numberSelector = new NumberSelector();

				this.appendChildWidget(this._numberSelector);

				this.addEventListener('keydown', function(e) { self._onKeyDown(e); });
				this.addEventListener('select', function(e) { self._onSelect(e); });

				this._sudoku = new Sudoku();
				this._sudoku.level = 0;

				this._sudoku.done = function() { self._updateGrid(); }

				this._sudoku.newGame();
	
			},

			_onKeyDown: function(e) {
				// Only allow digits 1-9 to be entered
				if(e.keyCode >= KeyEvent.VK_1 && e.keyCode <= KeyEvent.VK_9) {
					e.stopPropagation();

					var activeSquare = this._gameGrid._activeChildWidget;

					if(!activeSquare.hasClass("hint")) {
						activeSquare._childWidgetOrder[0]._childWidgetOrder[0].setText(e.keyChar);
						this._sudoku.setVal(activeSquare._row, activeSquare._col, parseInt(e.keyChar));


						this._showErrors();
					}
				} else {
					return;
				}
			},

			_onSelect: function(e) {

				this._activeSquare = this._gameGrid._activeChildWidget;

				if(e.target.hasClass("numberSelectorButton")) {
					this._numberSelector.addClass("hidden");
					this._activeSquare.focus();
				} else if(!this._activeSquare.hasClass("hint")) {
					this._numberSelector.removeClass("hidden");
					this._numberSelector.focus();
				}
			},

			_updateGrid: function() {
				for(var row = 0; row < 9; row++) {
					for(var col = 0; col < 9; col++) {
						var squareValue = this._sudoku.getVal(row, col);
						
						if(squareValue != "0") {
							this._gameGrid.getWidgetAt(col, row)._childWidgetOrder[0]._childWidgetOrder[0].setText(squareValue);
							this._gameGrid.getWidgetAt(col, row).addClass("hint");
						}
					}
				}
			},

			_showErrors: function() {
				for(var row = 0; row < 9; row++) {
					for(var col = 0; col < 9; col++) {
						
						var button = this._gameGrid.getWidgetAt(col, row);

						var value = this._sudoku.getVal(row, col);

						if(this._sudoku.checkVal(row, col, value) == false) {
							button.addClass("error");
						} else {
							button.removeClass("error");
						}
					}
				}
			}

		});
	}
);