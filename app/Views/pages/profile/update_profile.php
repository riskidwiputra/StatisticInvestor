<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Update Profile</h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

        <div class="row">

            <div class="col-lg-6">
                <!-- Basic Card Example -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Update Profile</h6>
                    </div>
                    <div class="card-body">
                        
                        <form class="user" method="post" action="<?= BASEURL; ?>/update-profile/<?= $data['content']['id_admin'] ?>" enctype="multipart/form-data">
                            <div class="form-group row">
                                
                                <div class="col-sm-12">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" class="form-control" name="username" value="<?= $data['content']['username'] ?> "   id="exampleUserName" required="" placeholder="User Name">
                                </div>
                            </div>  
                            <div class="form-group">
                                <label for="exampleSelectGender">Gender</label>
                                <select class="form-control" name="gender" id="exampleSelectGender" required="">
                                <option readonly="" value="<?= $data['content']['gender'] ?>" hidden=""><?= $data['content']['gender'] ?> </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label> 
                                <textarea class="form-control" name="address" id="address" required=""><?= $data['content']['address'] ?></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" class="form-control" name="email" value="<?= $data['content']['email'] ?>" id="#" placeholder="Email Address" required="">
                            </div>
                            <div class="form-group">
                                <label for="position">Position</label>
                                <input type="text" class="form-control" id="position" name="position" value="<?= $data['content']['position'] ?>" id="exampletxt" placeholder="Position" required="">
                            </div>
                            <hr>
                            <button class="btn btn-primary btn-user btn-block">
                                Save
                            </button>
                        </div>
                    </div>

                </div>

                <div class="col-lg-6">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">My Picture</h6>
                        </div>
                        <div class="card-body">
                            <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 30rem;" src="<?= path('path_portal_Datamanagement').$data['content']['image'];?>" alt="">
                           
                            <div class="form-group">
                                <input type="file" id="" name="image">
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>





</div>