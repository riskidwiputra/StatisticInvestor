<!-- partial:partials/_footer.html -->
<footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2017 <a href="<?=url();?>" target="_blank">Stream Universe</a>. All rights reserved.</span> 
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
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
    <script>
    $(document).ready(function() {
    $('#example').DataTable();
    } );
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
        }
    });

    function get_total(quantity) {
            var rate = $("#rate").val();
            var result = eval(quantity) * rate;
            
            $.ajax({
            url: '<?=url("get-harga/");?>'+ result, 
            type: 'GET',
            dataType: 'json',
            success: function(msg) {
                $("#get_balance").val(msg);  
            }
        });
    }

    
      

  </script>
    <!-- End custom js for this page -->
  </body>
</html>