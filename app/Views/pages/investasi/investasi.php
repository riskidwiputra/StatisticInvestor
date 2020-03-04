<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Investasi </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

    <div class="row"> 
        <div class="col-lg-6 col-md-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Investasi </h6>
                </div>
                <div class="card-body">
                    <?php Flasher::flash();?>
                    <form class="user" method="post" action="<?= url("insert-investasi"); ?>">
                        <div class="form-group">
                            <label for="users">Username</label>
                            <select class="form-control" id="users" name="username" required="">
                                <option readonly="" value="" hidden="" >--SELECT INVESTOR--</option>
                                <?php foreach($data['investor'] as $investor):?>
                                    <option value="<?=$investor['username'];?>"><?=$investor['username'];?></option>
                                <?php endforeach;?>
                            </select>
                        </div>
        
                        <div class="form-group">
                            <label for="nominal">Nominal Lembar Saham</label> 
                            <div class="input-group mb-3">
                                <input type="hidden" id="rate" value="0">
                                <input type="text" class="form-control" id="balance" placeholder="Nominal Lembar Saham" autocomplete="off" onkeypress="return number(event)" onkeyup="get_total(this.value);" name="lembar_saham" required="">
                                <div class="input-group-append">
                                <span class="input-group-text bg-gradient-primary text-white">Lembar</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="nominal">Harga Perlembar Saham</label> 
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text bg-gradient-primary text-white">RP.</span>
                                </div>
                                <input type="text" class="form-control"  placeholder="<?= number_format($data['saham']['harga_persaham'],0,',','.'); ?>" readonly="" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="nominal">Sisa Lembar Saham</label> 
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="<?= number_format($data['sisa_saham'],0,',','.'); ?>" readonly="">
                                <div class="input-group-append">
                                <span class="input-group-text bg-gradient-primary text-white">Lembar</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="nominal">Total Harga</label> 
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text bg-gradient-primary text-white">RP.</span>
                                </div>
                                <input type="text" class="form-control" id="get_balance" placeholder="Total Harga" readonly="" name="total_harga">
                            </div>
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-facebook btn-user btn-block">
                            Add Investasi
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-lg-6 col-md-6">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Transfer Investasi</h6>
                </div>
                <div class="card-body">
                    <?php Flasher::flash();?>
                    <form class="user" method="post" action="<?= url("insert-transfer-investasi"); ?>">
                        <div class="form-group">
                            <label for="pengirim">Username Pengirim</label>
                            <select class="form-control" id="pengirim" name="username_pengirim" required="">
                                <option readonly="" value="" hidden="" >--SELECT INVESTOR--</option>
                                <?php foreach($data['investor'] as $investor):?>
                                    <option  value="<?=$investor['username'];?>"><?=$investor['username'];?></option>
                                <?php endforeach;?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="penerima">Username Penerima</label>
                            <select class="form-control" name="username_penerima" required="">
                                <option readonly="" value="" hidden="" >--SELECT INVESTOR--</option>
                                <?php foreach($data['investor'] as $investor):?>
                                    <option  value="<?=$investor['username'];?>"><?=$investor['username'];?></option>
                                <?php endforeach;?>
                            </select>
                        </div>
        
                        <div class="form-group">
                            <label for="nominal">Nominal Lembar Saham</label> 
                            <div class="input-group mb-3">
                                <input type="hidden" id="lembar" value="0">
                                <input type="text" class="form-control" id="balance" placeholder="Nominal Lembar Saham" autocomplete="off" onkeypress="return number(event)" onkeyup="get_total_transfer(this.value);" name="lembar_saham" required="">
                                <div class="input-group-append">
                                <span class="input-group-text bg-gradient-primary text-white">Lembar</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="nominal">Harga Perlembar Saham</label> 
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text bg-gradient-primary text-white">RP.</span>
                                </div>
                                <input type="text" class="form-control"  placeholder="<?= number_format($data['saham']['harga_persaham'],0,',','.'); ?>" readonly="" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="nominal">Sisa Lembar Saham</label> 
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="lembar_saham2"  readonly="">
                                <div class="input-group-append">
                                <span class="input-group-text bg-gradient-primary text-white">Lembar</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="nominal">Total Harga</label> 
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text bg-gradient-primary text-white">RP.</span>
                                </div>
                                <input type="text" class="form-control" id="get_harga_transfer" placeholder="Total Harga" readonly="" name="total_harga">
                            </div>
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-facebook btn-user btn-block">
                            Add Investasi
                        </button>
                    </form>
                </div>
            </div>
        </div>

    </div>



    </div>

