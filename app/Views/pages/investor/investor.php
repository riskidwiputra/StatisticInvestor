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

        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                <div class="table-responsive">
                <div class="col-lg">
                <?php Flasher::flash();?> 
            </div>
                    <div class="card-body">
                    <h4 class="card-title">Striped Table</h4>
                    <a href="<?= url("add-investor") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add Data Investor </button></a>
                    </p>
                    
                    <table id="example" class="table table-striped "  style="width:100%">
                        <thead>
                        <tr>
                        <th width="12%" > User </th>
                            <th width="18%"> Username </th>
                            <th width="20%"> Email </th>
                            <th width="12%"> Gender </th>
                            <th width="25%"> Address </th>
                            <th width="13%" >Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach ($data['content'] as $row) { ?>
                        <tr>
                            <td class="py-1" align="center">
                            <img src="<?= path('path_portal_Investor').$row['image'];?>" alt="image" />
                            </td>

                            <td > <?= $row['username'] ?> </td>
                            <td> <?= $row['email'] ?></td>
                            <td> <?= $row['gender'] ?> </td>
                            <td> <?= $row['address']?> </td>
                            <td style="text-align: center;">
                            <a href="">
                            <button type="button" class="btn btn-gradient-info btn-rounded btn-icon">
                            <i class="mdi mdi-pencil"></i>
                            </button>
                            </a>
                            &nbsp;
                            <a href="">
                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon">
                            <i class="mdi mdi-delete"></i>
                            </button>
                            </a>
                            </td>
                        </tr>
                    <?php }  ?>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </div>
                </div>