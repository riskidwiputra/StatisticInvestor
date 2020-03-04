<div class="main-panel">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Saham </h3>
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
                    <h4 class="card-title">Saham</h4>
                    <?php if ($data['saham'] < 1) { ?>
                        <a href="<?= url("add-saham") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add Data Saham </button></a>
                    <?php } ?>
                    </p>
                    
                    <table class="table table-striped" id="example">
                        <thead>
                        <tr>
                            <th width="5%" > No </th>
                            <th width="30%"> Name Saham </th>
                            <th width="20%"> Harga PerSaham </th>
                            <th width="20%"> Total Saham </th>
                            <th width="15%"> Tahun </th>
                            <td width="20%"> Aksi </td>
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

                            <td><?= $rows['name_saham'] ?></td>
                            <td><?php rupiah($rows['harga_persaham']); ?> </td>
                            <td><?= lembar($rows['total_saham']); ?> </td>
                            <td><?= $rows['tahun'] ?> </td>
                            <td>
                            <a href="<?= url("edit-saham")."/".$rows['id_saham'] ?>"><button type="button" class="btn btn-gradient-success btn-icon">
                            <i class="mdi mdi-tooltip-edit"></i>
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