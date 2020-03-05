<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Profile </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <!-- Basic Card Example -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">My Profile</h6>
                    </div>
                    <div class="card-body">
                        <form class="user">

                            <div class="form-group row">
                                <div class="col-sm-4 mb-2 mb-sm-0">
                                    <p><b>Username</b></p>
                                </div>
                                <div class="col-sm-1 mb-2 mb-sm-0">
                                    <p>:</p>
                                </div>
                                <div class="col-sm-6">
                                    <p><?= $data['content']['username'] ?></p>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-4 mb-2 mb-sm-0">
                                    <p><b>Gender</b></p>
                                </div>
                                <div class="col-sm-1 mb-2 mb-sm-0">
                                    <p>:</p>
                                </div>
                                <div class="col-sm-6">
                                    <p><?= $data['content']['gender'] ?></p>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-4 mb-2 mb-sm-0">
                                    <p><b>Address</b></p>
                                </div>
                                <div class="col-sm-1 mb-2 mb-sm-0">
                                    <p>:</p>
                                </div>
                                <div class="col-sm-6">
                                    <p><?= $data['content']['address'] ?></p>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-4 mb-2 mb-sm-0">
                                    <p><b>Email Address</b></p>
                                </div>
                                <div class="col-sm-1 mb-2 mb-sm-0">
                                    <p>:</p>
                                </div>
                                <div class="col-sm-6">
                                    <p><?= $data['content']['email'] ?></p>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-4 mb-2 mb-sm-0">
                                    <p><b>Position</b></p>
                                </div>
                                <div class="col-sm-1 mb-2 mb-sm-0">
                                    <p>:</p>
                                </div>
                                <div class="col-sm-6">
                                    <p><?= $data['content']['position'] ?></p>
                                </div>
                            </div> 
                            <hr> 
                            <div class="row">
                
                                    <a href="<?=url('update-profile');?>" class="btn btn-outline-info btn-icon-text mr-3">
                                    Update Profile  <i class="mdi mdi-pencil"></i> 
                                    </a> 
                
                                
                                <a href="<?=url('change-password_profile/').$data['content']['id_admin'];?>" class="btn btn-danger btn-block col ml-3"" >
                                Reset Password <i class="fas fa-sync-alt"></i>
                                </a>
                
                            </div> 
                        </form>
                    </div>
                </div>

            </div>

            <div class="col-lg-6">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">My Picture</h6>
                    </div>
                    <div class="card-body">
                    <?php if(!empty($data['content']['image'])){ ?>  
                        <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 30rem;" src="<?= path('path_portal_Datamanagement').$data['content']['image'];?>" alt="">
                    <?php  }else { ?>
                        <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 30rem; " src="<?=asset('assets/images/faces/face23.jpg');?>" alt="">
                    <?php  } ?>
                    </div>
                </div>
            </div>

        </div>
</div>
