<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Dashboard </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>
    
        <div class="col-12 grid-margin stretch-card">
                <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Basic form elements</h4>
                    <form class="" method="post" action="<?= BASEURL ?>/insert-investor" enctype="multipart/form-data" >
                    <div class="form-group">
                        <label for="exampleInputName1">Username</label>
                        <input type="text" class="form-control" name="username" id="exampleInputName1" placeholder="username" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail3">Email address</label>
                        <input type="email" class="form-control" name="email" id="exampleInputEmail3" placeholder="Email" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword4">Password</label>
                        <input type="password" class="form-control" name="password" id="exampleInputPassword4" placeholder="Password" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword4">RePassword</label>
                        <input type="password" class="form-control" name="repassword" id="exampleInputPassword4" placeholder="RePassword" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleSelectGender">Gender</label>
                        <select class="form-control" name="gender" id="exampleSelectGender" required="">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <input type="file" name="img" class="file-upload-default" required="">
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload Image">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea1">Alamat</label>
                        <textarea class="form-control" name="alamat" id="exampleTextarea1" rows="4" required=""></textarea>
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <input type="file" name="img_ktp" class="file-upload-default" required="">
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload KTP">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload KTP</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail3">Nik</label>
                        <input type="number" class="form-control" name="id_ktp" placeholder="nik" required="">
                    </div>
                    <div class="form-group">
                        <label>File upload</label>
                        <input type="file" name="img_npwp" class="file-upload-default" required="">
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload NPWP">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload NPWP</button>
                        </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail3">ID NPWP</label>
                        <input type="number" class="form-control" name="id_npwp" placeholder="ID NPWP" required="">
                    </div>
                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                    </form>
                </div>
                </div>
            </div>
</div>