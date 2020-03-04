<div class="main-panel ">
    <div class="content-wrapper">
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
            <i class="mdi mdi-newspaper"></i>
            </span> 
            Data Management
            </h3>
            <?php Flasher::flash();?>
            <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">
                    Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                    </li>
                </ul>
            </nav>
        </div>
        
        <div class="row">
            <div class="col-lg-12 mb-12">
                <div class="mb-4">
                        <a href="<?= BASEURL ?>/add-datamanagement"> <button class="btn btn-outline-primary"><span class="fa fa-plus-circle fa-spin"></span> Add Data Management </button></a>
                    <div class="row">
                        <div class="col-lg">
                            <?php Flasher::flash();?> 
                        </div>
                    </div> 
                </div>
            </div>
            <?php  foreach ($data['content'] as $rows) { ?>
        
            <div class="col-lg-3 mb-4">
                <!-- Illustrations -->
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary text-center">Data Management</h6>
                    </div>
                    <div style="padding: 10px">
                        
                            <img class="" style="width: 100%" src="<?= path('path_portal_Datamanagement').$rows['image'] ?>" alt="">
                    </div>
                    <div class="card-header py-3" style="padding:20px; text-align: center;">
                            <h2 style="font-size: 20px; color: #303030; font-weight:bold;" class=""><?= strtoupper($rows['username']); ?></h2>
                        <p style="font-size:14px;color:#303030;margin:0; display:block;margin-block-start: 1em;margin-block-end: 1em;margin-inline-start: 0px;margin-inline-end: 0px;">
                            <?=  $rows['position']; ?>
                        </p>
                        <p style="font-size: 14px;color: #303030;margin: 0;">
                        <b>Age :</b> 20 Years
                        </p>

                        <a href="#" class="btn btn-info font-weight-bold" style="margin-top:10px;padding:5px;"> 
                        Lihat Detail
                        </a>
                    </div>
                </div>
            </div>
            <?php } ?>
            

</div>
