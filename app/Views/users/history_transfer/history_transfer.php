<div class="main-panel">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Histry Transfer </h3>
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
                    <h4 class="card-title">History Transfer</h4>

                    </p>
                    
                    <table id="example" class="table table-striped "  style="">
                        <thead>
                        <tr>
                            <th width="10%" >Nama Pengirim</th>
                            <th width="10%"> Nama Penerima  </th>
                            <th width="10%"> Activity </th>
                            <th width="10%"> Jumlah Saham Dikirim</th>
                            <th width="20%"> Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($data['content'] as $row) { ?>
                        <tr>
                            <td> <?= $row['id_pengirim'] ?>     </td>
                            <td> <?= $row['id_penerima'] ?>     </td>
                            <td> <?= $row['activity'] ?>        </td>
                            <td> <?= $row['jumlah_saham'] ?>    </td>
                            <td> <?= $row['date']?>             </td>
                        </tr>
                        <?php }  ?>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </div>
                </div>