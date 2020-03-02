<div class="main-panel mt-5">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Report </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                <div class="table-responsive">
                <div class="col-lg">
                <?php Flasher::flash();?> 
            </div>
                    <div class="card-body">
                    <h4 class="card-title">Report</h4>
                    <?php if (empty($data['bulan'])){ ?>
                        <a href="<?= url("add-report") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add Report </button></a>
                    <?php } ?>
                    </p>
                    
                    <table class="table table-striped" id="example">
                        <thead>
                        <tr>
                            <th> No </th>
                            <th> Report</th>
                            <th> Date </th>
                            <td > Aksi </td>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $no= 1;
                        foreach ($data['content'] as $rows) { ?>
                        <tr>
                            <td class="py-1" align="center">
                            <?= $no++ ?>
                            </td>

                            <td><?= $rows['report'] ?></td>
                            
                            <td><?= $rows['date'] ?> </td>
                            <td align="center">
                            <a href="<?= url("edit-saham")."/".$rows['id_report'] ?>"><button type="button" class="btn btn-gradient-success btn-icon">
                            <i class="mdi mdi-tooltip-edit"></i>
                            </button>
                            </a>
                            &nbsp;  
                            <a href="<?= url("dalete-report")."/".$rows['id_report'] ?>"><button type="button" class="btn btn-gradient-danger btn-icon">
                            <i class="mdi mdi-delete"></i>
                            </button>
                            </a>
                            </td>
                        </tr>
                        <?php
                        }
                        ?>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
        </div>
                </div>