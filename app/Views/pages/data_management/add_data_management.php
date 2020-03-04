<div class="main-panel">
        <div class="content-wrapper">
        

        <div class="col-12 grid-margin stretch-card">
                <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Basic form elements</h4>
                    <form class="" method="post" action="<?= BASEURL ?>/insert-datamanagement" enctype="multipart/form-data" >
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
                        <div class="row">
                            <div class="col-md-6">
                                <label for="exampleSelectGender">Gender</label>
                                <select class="form-control" name="gender" id="exampleSelectGender" required="">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label>File upload</label>
                                <input type="file" name="img" class="file-upload-default" required="">
                                <div class="input-group col-xs-12">
                                <input type="text" class="form-control file-upload-info" disabled placeholder="Upload Image">
                                <span class="input-group-append">
                                    <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">
                                <label class="control-label" for="select-default">Date of birth</label>
                                <div class="input-group ">
                                    <select  name="tanggal" class="form-control col-lg-4" required="">
                                        <option readonly=""  value="" hidden="">Date</option>
                                        <?php   for ($i=01; $i <= 31 ; $i++) { ?>
                                            <?php if ($i <= 9){ ?>
                                            <option value="0<?= $i ?>">0<?= $i ?></option>
                                            <?php }else{ ?>
                                            <option value="<?= $i ?>"><?= $i ?></option>
                                            <?php } ?>
                                        <?php } ?>
                                    </select>
                                    <select name="bulan" class="form-control col-lg-4" required="">
                                        <option readonly=""  value="" hidden="">Month</option>

                                        <?php $bulan=array("","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"); ?>
                                            <?php  for ($i=1;$i<=12;$i++){ ?>
                                            <option value="<?= $i ?>"><?= $bulan[$i] ?></option>
                                            <?php } ?>
                                    </select>

                                    <select   name="tahun" class="form-control col-lg-4" required="">
                                        <option readonly=""  value="" hidden="">Year</option>
                                        <?php for ($i=2020; $i>=1945 ; $i--) { ?> 
                                            <option value="<?= $i ?>"><?= $i ?></option>
                                        <?php } ?>
                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputName1">Position</label>
                        <input type="text" class="form-control" name="position" id="exampleInputName1" placeholder="Position" required="">
                    </div>
                    <div class="form-group">
                        <label for="exampleTextarea1">Alamat</label>
                        <textarea class="form-control" name="alamat" id="exampleTextarea1" rows="4" required=""></textarea>
                    </div>
                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                    </form>
                </div>
                </div>
            </div>
</div>