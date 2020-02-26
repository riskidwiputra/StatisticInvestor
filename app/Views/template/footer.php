<!-- partial:partials/_footer.html -->
<footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <?=date('Y');?> <a href="<?=url();?>" target="_blank">Stream Universe</a>. All rights reserved.</span> 
            </div>
          </footer>
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="<?= asset('assets/vendors/js/vendor.bundle.base.js') ?>"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <script src="<?= asset('assets/vendors/chart.js/Chart.min.js') ?>"></script>
    <!-- End plugin js for this page -->
    <!-- inject:js -->
    
    <script src="<?= asset('assets/js/off-canvas.js') ?>"></script>
    <script src="<?= asset('assets/js/hoverable-collapse.js') ?>"></script>
    <script src="<?= asset('assets/js/misc.js') ?>"></script>
    <script src="<?= asset('assets/js/file-upload.js') ?>"></script>
    <!-- endinject -->
    <!-- Custom js for this page -->
    <script src="<?= asset('assets/js/dashboard.js') ?>"></script>
    <script src="<?= asset('assets/js/todolist.js') ?>"></script>
    <script type="text/javascript" charset="utf8" src="<?= BASEURL ?>/public/assets/vendors/datatables/jquery.dataTables.min.js"></script>
  <script type="text/javascript" charset="utf8" src="<?= BASEURL ?>/public/assets/vendors/datatables/dataTables.bootstrap4.min.js"></script>
    <script>
    $(document).ready(function() {
    $('#example').DataTable();
    } );
    </script>
    <script type="text/javascript">
	$(document).ready(function(){		
		$('#check').click(function(){
			if($(this).is(':checked')){
				$('#password_sekarang').attr('type','text');
			}else{
				$('#password_sekarang').attr('type','password');
			}
		});
	});
</script>
    <script>
    function number(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    </script>
    <script type="text/javascript">

    $.ajax({
        url: '<?=url("get-saham");?>', 
        data: 'balance=1',
        type: 'POST',
        dataType: 'html',
        success: function(msg) {
            $("#rate").val(msg);  
            $("#lembar").val(msg);  
        }
    });

    function get_total(quantity) {
            var rate = $("#rate").val();
            var result = eval(quantity) * rate;
            
            $.ajax({
            url: '<?=url("get-harga/");?>'+ result, 
            type: 'POST',
            dataType: 'json',
            success: function(msg) {
                $("#get_balance").val(msg);  
            }
        });
    }
    $('#pengirim').on('click', function (e) {
      var pengirim = $("#pengirim option:selected").val();
      
    //  

      $.ajax({
        url: '<?=url("get-transfer");?>', 
        data: {
          data : pengirim
        },
        type: 'POST',
        dataType: 'html',
        success: function(msg) {
            $("#lembar_saham2").attr("placeholder", msg);
        }
    });

  });


  function get_total_transfer(quantity) {
        var lembar = $("#lembar").val();
        var result2 = eval(quantity) * lembar;

        $.ajax({
            url: '<?=url("get-harga-transfer/");?>'+ result2, 
            type: 'POST',
            dataType: 'json',
            success: function(msg) {
                $("#get_harga_transfer").val(msg);  
            }
        });
  
      
    }

  </script>
  
    <!-- End custom js for this page -->
  </body>
</html>