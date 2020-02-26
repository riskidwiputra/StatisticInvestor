<div class="main-panel mt-5">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Activity Log </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>

        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                
                <div class="col-lg">
                <?php Flasher::flash();?> 
            </div>
            <div class="table-responsive">
                    <div class="card-body">
                    <h4 class="card-title">Activity Log</h4>

                    </p>
                    
                    <table id="example" class="table table-striped "  style="">
                        <thead>
                        <tr>
                            <th width="10%" > Id Admin </th>
                            <th width="10%"> Nama Table </th>
                            <th width="10%"> Id </th>
                            <th width="10%"> Activity </th>
                            <th width="30%"> Keterangan </th>
                            <th width="20%"> Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($data['content'] as $row) { ?>
                        <tr>
                            <td> <?= $row['id_admin'] ?>    </td>
                            <td> <?= $row['name_table'] ?>  </td>
                            <td> <?= $row['id'] ?>          </td>
                            <td> <?= $row['activity'] ?>    </td>
                            <td> <?= $row['keterangan']?>   </td>
                            <td> <?= $row['date']?>         </td>
                        
                        </tr>
                        <?php }  ?>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </div>
                </div>