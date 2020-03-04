<div class="main-panel ">
        <div class="content-wrapper">
        
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Edit Investor</h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>
       
        <div class="col-12 grid-margin stretch-card">
                <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Basic form elements</h4>
                    <form class="" method="post" action="<?= url("update-investor/").$data['content']['id_investor']; ?>" enctype="multipart/form-data" >
                    <div class="form-group">
                        <label for="exampleInputName1">Username</label>
                        <input type="text" class="form-control" name="username" id="exampleInputName1" value="<?= $data['content']['username'] ?>" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail3">Email address</label>
                        <input type="email" class="form-control" name="email" id="exampleInputEmail3" value="<?= $data['content']['email'] ?>" required="">
                    </div>
                    <!-- <div class="form-group">
                        <label for="exampleInputPassword4">Password</label>
                        <input type="password" class="form-control" name="password" id="exampleInputPassword4" placeholder="Password" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword4">RePassword</label>
                        <input type="password" class="form-control" name="repassword" id="exampleInputPassword4" placeholder="RePassword" required="">
                    </div> -->
                    <div class="form-group">
                        <label for="exampleSelectGender">Gender</label>
                        <select class="form-control" name="gender" id="exampleSelectGender" required="">
                        <option readonly="" value="<?= $data['content']['gender'] ?>" hidden=""><?= $data['content']['gender'] ?> </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <div class="input-group col-xs-12 mt-2 mb-3">
                        <img class="pt-2 text-center align-center" src="<?= path('path_portal_Investor').$data['content']['image'];?>"  width="150" height="100" alt="" />
                        </div>
                        <input type="file" name="img" class="file-upload-default" >
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload Image">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea1">Alamat</label>
                        <textarea class="form-control" name="alamat" id="exampleTextarea1" rows="4" required=""><?= $data['content']['address'] ?></textarea>
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <div class="input-group col-xs-12 mt-2 mb-3">
                        <img class="pt-2 text-center align-center" src="<?= path('path_portal_Investor').$data['content']['image_ktp'];?>"  width="150" height="100" alt="" />
                        </div>
                        <input type="file" name="img_ktp" class="file-upload-default" >
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload KTP">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload KTP</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea1">NIK</label>
                        <input type="number" class="form-control" name="nik" id="exampleInputName1" value="<?= $data['content']['id_ktp'] ?>" required="">
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <div class="input-group col-xs-12 mt-2 mb-3">
                        <img class="pt-2 text-center align-center" src="<?= path('path_portal_Investor').$data['content']['image_npwp'];?>"  width="150" height="100" alt="" />
                        </div>
                        <input type="file" name="img_npwp" class="file-upload-default" >
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload NPWP">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload NPWP</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea1">ID NPWP</label>
                        <input type="number" class="form-control" name="npwp" id="exampleInputName1" value="<?= $data['content']['id_npwp'] ?>" required="">
                    </div>
                    
                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                    </form>
                </div>
                </div>
            </div>
</div>