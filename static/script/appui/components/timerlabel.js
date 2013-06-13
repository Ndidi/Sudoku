require.def("sudoku/appui/components/timerlabel",
    [
        "antie/widgets/label"
    ],
    function(Label){
        return Label.extend({
            init: function(id){
                this._super(id, "00:00");

                var self = this;
                self._seconds = 0;
                self._minutes = 0;

                setInterval(function () {
                    self._seconds ++;
                    if(self._seconds > 59){
                        self._seconds = 0;
                        self._minutes ++;
                    }

                    self.setText(((self._minutes < 10)? "0":"")+self._minutes +":"+ ((self._seconds < 10)? "0":"") +self._seconds);
                },1000);
            }
        });
    }
);