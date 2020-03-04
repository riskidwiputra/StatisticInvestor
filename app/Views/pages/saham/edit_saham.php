<div class="main-panel">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Dashboard </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div> 
            
            
        <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                <h4 class="card-title">Edit Saham</h4>
                <form class="" method="post" action="<?= BASEURL ?>/edit-saham/<?= $data['content']['id_saham'] ?>" enctype="multipart/form-data" >
                    <div class="form-group">
                    <label for="exampleInputUsername1">Name Saham</label>
                    <input type="text" class="form-control" placeholder="<?= $data['content']['name_saham'] ?>" disabled>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputUsername1">Price Saham</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <span class="input-group-text bg-gradient-primary text-white">RP.</span>
                        </div>
                        <input type="number" class="form-control" value="<?= $data['content']['harga_persaham'] ?>" name="price" required="">
                        <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                        </div>
                    </div>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputUsername1">Total Saham</label>
                    <div class="input-group">
                        <input type="number" value="<?= $data['content']['total_saham'] ?>" class="form-control" name="total_saham" required="">
                        <div class="input-group-append">
                        <span class="input-group-text bg-gradient-primary text-white">Sheet</span>
                        </div>
                    </div>
                    </div>
                
                    <div class="form-group">
                    <label >Year</label>
                    <div class="input-group">
                    <input class="form-control" placeholder="<?= $data['content']['tahun'] ?>" disabled>
                    </div>
                    </div>
                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                </form>
                </div>
            </div>
        </div>
    </div>
