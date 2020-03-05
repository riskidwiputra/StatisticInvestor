<!DOCTYPE html>
<html lang="en">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- Required meta tags -->
    
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> Stream-Universe</title>
    <!-- plugins:css -->

    <link href="<?= BASEURL ?>/public/assets/vendors/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?= asset('assets/vendors/mdi/css/materialdesignicons.min.css'); ?>">
    <link rel="stylesheet" href="<?= asset('assets/vendors/css/vendor.bundle.base.css'); ?>">
    <!-- endinject -->
    <!-- Plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <!-- endinject -->
    <!-- Layout styles -->
    <link rel="stylesheet" href="<?= asset('assets/css/style.css'); ?>">
   

    <link href="<?= BASEURL ?>/public/assets/vendors/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
  <!-- <link href=" https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css" rel="stylesheet"> -->
  
    <script src="<?= BASEURL ?>/public/assets/vendors/sweetalert/js/sweetalert2.all.min.js"></script>
    
  <script src="<?= BASEURL ?>/public/assets/vendor/jquery/jquery.min.js"></script> 
    <!-- End layout styles -->
    <link rel="shortcut icon" href="<?=asset('assets/images/streammm-universe.png');?>" />
</head>
<body>
    <div class="container-scroller">
   


        <!-- partial:partials/_sidebar.html -->
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo" href="<?=url();?>"><img src="<?=asset('assets/images/streammm-universe.png');?>" alt="logo" style="height:100px;" /></a>
          <a class="navbar-brand brand-logo-mini p-0" href="<?=url();?>"><img src="<?=asset('assets/images/streammm-universe.png');?>" alt="logo" style="width:800px;" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
          <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="mdi mdi-menu"></span>
          </button>
          <div class="search-field d-none d-md-block">
            <form class="d-flex align-items-center h-100" action="#">
              <div class="input-group">
                <div class="input-group-prepend bg-transparent">
                  <i class="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" class="form-control bg-transparent border-0" placeholder="Search projects">
              </div>
            </form>
          </div>
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown d-none d-lg-block d-xl-block  ">
              <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <div class="nav-profile-img">
                <?php if(Session::get("superadmin")){ ?>
                <img src="<?=asset('assets/images/faces/face24.jpg');?>" alt="profile">
                <?php }else if(Session::get("admin")){
                $admin	= $this->db->table('admin')->where('id_admin', Session::get('admin'));
                ?>
                <img src="<?=asset('assets/images/faces/face3.jpg');?>" alt="profile">
                <?php }else{ 
                  $investor	= $this->db->table('investor')->where('id_investor', Session::get('users'));
                  ?>
                  <img src="<?= path('path_portal_Investor').$investor['image'];?>" alt="profile">
                <?php } ?>
                  <span class="availability-status online"></span>
                </div>
                <div class="nav-profile-text">
                  <p class="mb-1 text-black"><?php if(!empty(Session::get('users'))){ $investor	= $this->db->table('investor')->where('id_investor', Session::get('users')); echo $investor['username']; } if(!empty(Session::get('admin'))){ $admin	= $this->db->table('admin')->where('id_admin', Session::get('admin'));	 echo $admin['username']; } if(!empty(Session::get('superadmin'))){ $superadmin	= $this->db->table('admin')->where('id_admin', Session::get('superadmin')); echo $superadmin['username']; } ?></p>
                </div>
              </a>
              <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
              <?php if(Session::get("superadmin") || Session::get("admin") ){ ?>
                <a class="dropdown-item" href="<?= url('profile') ?>">
                  <i class="mdi mdi-account mr-2 text-success"></i> Profil </a>
              <?php } ?>
              <?php if(Session::get("superadmin")){ ?>
                <a class="dropdown-item" href="<?= url('activity-log') ?>">
                  <i class="mdi mdi-cached mr-2 text-success"></i> Activity Log </a>
              <?php } ?>
              <?php if(Session::get("users") || Session::get("superadmin") ){ ?>
                <a class="dropdown-item" href="<?= url('history_transfer') ?>">
                  <i class="mdi mdi-cached mr-2 text-success"></i> History Transfers </a>
              <?php } ?>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="<?= url('logout') ?>">
                  <i class="mdi mdi-logout mr-2 text-primary"></i> Signout </a>
              </div>
            </li>
          
            
            <li class="nav-item dropdown">
              <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                <i class="mdi mdi-bell-outline"></i>
                <span class="count-symbol bg-danger"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 class="p-3 mb-0">Notifications</h6>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-success">
                      <i class="mdi mdi-calendar"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p class="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="mdi mdi-settings"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p class="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p class="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>
    
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <div class="container-fluid page-body-wrapper">
      
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile">
            <a href="#" class="nav-link">
                <div class="nav-profile-image">
                <?php if(Session::get("superadmin")){ ?>
                <img src="<?=asset('assets/images/faces/face24.jpg');?>" alt="profile">
                <?php }else if(Session::get("admin")){
                $admin	= $this->db->table('admin')->where('id_admin', Session::get('admin'));
                ?>
                <img src="<?=asset('assets/images/faces/face3.jpg');?>" alt="profile">
                <?php }else{ 
                  $investor	= $this->db->table('investor')->where('id_investor', Session::get('users'));
                  ?>
                  <img src="<?= path('path_portal_Investor').$investor['image'];?>" alt="profile">
                <?php } ?>
                <span class="login-status busy"></span>
                <!--change to offline or busy as needed-->


                </div>
                <div class="nav-profile-text d-flex flex-column">
                <span class="font-weight-bold mb-2"><?php if(!empty(Session::get('users'))){ $investor	= $this->db->table('investor')->where('id_investor', Session::get('users')); echo $investor['username']; } if(!empty(Session::get('admin'))){ $admin	= $this->db->table('admin')->where('id_admin', Session::get('admin'));	 echo $admin['username']; } if(!empty(Session::get('superadmin'))){ $superadmin	= $this->db->table('admin')->where('id_admin', Session::get('superadmin')); echo $superadmin['username']; } ?></span>
                <span class="text-secondary text-small"><?php if(!empty(Session::get('users'))){ echo "INVESTOR"; } if(!empty(Session::get('admin'))){ echo "ADMIN"; } if(!empty(Session::get('superadmin'))){ echo "SUPER ADMIN"; } ?></span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="<?=url();?>">
                <span class="menu-title">Dashboard</span>
                <i class="mdi mdi-home menu-icon"></i>
            </a>
            </li>
            <?php if(Session::check('superadmin') || Session::check('admin') == true ){  ?>
            <li class="nav-item">
            <a class="nav-link" href="<?=url('news');?>">
                <span class="menu-title">News</span>
                <i class="mdi mdi-newspaper menu-icon"></i>
            </a>
            </li>
            <?php } ?>
            <?php if(Session::get("superadmin")){ ?>
            <li class="nav-item">
            <a class="nav-link" href="<?=url('investor');?>">
                <span class="menu-title">Investor</span>
                <i class="mdi  mdi-account-multiple-plus menu-icon"></i>
            </a>
            </li> 
            <li class="nav-item">
            <a class="nav-link" href="<?=url('saham');?>">
                <span class="menu-title">Saham</span>
                <i class="mdi mdi-cash menu-icon"></i>
            </a>
            </li> 
            <li class="nav-item">
            <a class="nav-link" href="<?=url('investasi');?>">
                <span class="menu-title">Investasi</span>
                <i class="mdi mdi-currency-btc menu-icon"></i>
            </a>
            </li> 
            <li class="nav-item">
            <a class="nav-link" href="<?=url('report');?>">
                <span class="menu-title">Report</span>
                <i class="mdi mdi-file-export menu-icon"></i>
            </a>
            </li> 
            <li class="nav-item">
            <a class="nav-link" href="<?=url('data-management');?>">
                <span class="menu-title">Data Management</span>
                <i class="mdi mdi-account-check menu-icon"></i>
            </a>
            </li> 
            <?php } ?>
            <li class="nav-item d-xl-none d-lg-none" style="button:0px;">
            <a class="nav-link" href="<?= url('logout') ?>">
                <span class="menu-title text-danger">Signout</span>
                <i class="mdi mdi-logout  menu-icon"></i>
            </a>
            </li> 
            
        </ul>
        </nav>