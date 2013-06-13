require.def("sudoku/appui/components/timerlabel",
  [
    "antie/widgets/label"
  ],
  function(Label){
    return Label.extend({
      init: function(){
        this._super("timerLabel", 0);

        var self = this;
        self._count = 0;

        window.setInterval(function () {
          self._count = self._count + 1;
          self.setText(self._count)
        },1000);
      }
    });
  }
);