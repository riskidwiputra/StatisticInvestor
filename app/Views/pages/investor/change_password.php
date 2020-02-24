<div class="main-panel mt-5">
    <div class="content-wrapper">
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Dashboard </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

        <div class="row"> 
        <div class="col-lg-6 col-md-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Change Password </h6>
                </div>
                <div class="card-body">
                    <?php Flasher::flash();?>
                    <form  method="post" action="<?= url("change-password/").$data['id']; ?>">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Current Password</label>
                        <input type="password" class="form-control" name="current_password" id="password_sekarang" placeholder="Current Password">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" id="check"> Show Password </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputConfirmPassword1">Confirm Password</label>
                        <input type="password" name="confirm_password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password">
                    </div>
                        <button type="submit" class="btn btn-facebook btn-user btn-block">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    
    
    </div>
</div>