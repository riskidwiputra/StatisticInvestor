<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Login</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="<?= asset('assets/vendors/mdi/css/materialdesignicons.min.css'); ?>">
    <link rel="stylesheet" href="<?= asset('assets/vendors/css/vendor.bundle.base.css'); ?>">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="<?= asset('assets/css/style.css'); ?>">
    <!-- End layout styles -->
    <link rel="shortcut icon" href="<?= asset('assets/images/favicon.png');?>"  />
  </head>
  <body>
  <div class="container">
        
          <!-- <div class="row flex-grow">
          
            <div class="col-lg-4 col-md-6 mx-auto">
            
              <div class="auth-form-light text-center p-5">
              
                <div class="brand-logo">
                  <img src="<?=asset('assets/images/streammm-universe.png');?>" width="200px">
                </div>
                <div class="col-lg-12">
							<?php Flasher::flash();?>
						</div>
                <h4>Hello! let's get started</h4>
                <h6 class="font-weight-light">Sign in to continue.</h6>
              
                
                <form class="pt-3" action="<?= BASEURL ?>/login" method="post">
                  <div class="form-group">
                    <input type="text" name="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username / Email">
                  </div>
                  <div class="form-group">
                    <input type="password" name="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                  </div>
                  <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium">SIGN IN</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                  
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input"> Keep me signed in </label>
                    </div>
                    <a href="#" class="auth-link text-black">Forgot password?</a>
                  </div>
                  
                
                </form>
              </div>
            </div>
          </div> -->


          <div class="row justify-content-center my-5">

      <div class="col-sm-12 col-lg-6 col-md-10">
        <style>
          body{
            background-color:rgba(250, 240, 240, 0.452);
          }
        </style>

        <div class="card o-hidden border-primary shadow-lg">
            <img class="card-img-top py-2 px-2" src="<?=asset('assets/images/streammm-universe.png');?>">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            
            <div class="row">
              <div class="col-lg-12">
                <div class="p-4">
                  <div class="text-center mb-3">
                  <h4>Hello! let's get started</h4>
                <h6 class="font-weight-light">Sign in to continue.</h6>
                  </div>
                  <form class="pt-3" action="<?= BASEURL ?>/login" method="post">
                    <div class="form-group">
                    <input type="text" name="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username / Email">
                    </div>
                    <div class="form-group">
                    <input type="password" name="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Remember Me</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium">SIGN IN</button>
                  </form>
                  <!-- <div class="text-center">
                    <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div> -->
                  <div class="my-2 d-flex justify-content-between align-items-center">
                  
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input"> Keep me signed in </label>
                    </div>
                    <a href="#" class="auth-link text-black">Forgot password?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>

    </div>




        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- plugins:js -->
    <script src="<?= asset('assets/vendors/js/vendor.bundle.base.js'); ?>"></script>
    <!-- endinject -->
    <!-- Plugin js for this page -->
    <!-- End plugin js for this page -->
    <!-- inject:js -->
    <script src="<?= asset('assets/js/off-canvas.js'); ?>"></script>
    <script src="<?= asset('assets/js/hoverable-collapse.js'); ?>"></script>
    <script src="<?= asset('assets/js/misc.js'); ?>"></script>
    <!-- endinject -->
  </body>
</html>