<div class="main-panel mt-5">
        <div class="content-wrapper">
        
        
        <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> News </h3>
                <?php Flasher::flash();?>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="row">
              <div class="col-12 grid-margin">
                <div class="card">
                
                  <div class="card-body">
                  
                    <h4 class="card-title">Daily</h4>
                    <a href="<?= url("addnewsdaily") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add News Daily </button></a>
                    <?php foreach ($data['daily'] as $rows) { ?>
                    <div class="media pt-4">
                          
                          <img class="align-self-start mr-3" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">

                          <div class="media-body d-none d-xl-block">
                          <div class="pb-2">
                          </div>
                            <h5 class="mt-0"><?= strtoupper($rows['title']) ?>
                            <span style="text-align: right;" class="align-right text-right ml-3">
                            <a href="<?= url('update-news/').$rows['url']; ?>">
                            <button type="button" style="padding: 0.1rem 0.8rem;" class="btn btn-sm btn-outline-primary ">
                            <i class="mdi mdi-pencil"></i>
                            </button>
                            </a>
                            &nbsp;
                            <a href="<?= url('dalete-news/').$rows['id_news']; ?>" class="delete">
                            <button type="button" style="padding: 0.1rem 0.8rem;"  class="btn btn-sm btn-outline-danger ">
                            <i class="mdi mdi-delete"></i>
                            </button>
                            </a> 
                            </span>
                            </h5>
                          
                            <p style="margin-top:-15px;"><?php  
                            $text = htmlspecialchars_decode($rows['content']);
                            if ( str_word_count($rows['content']) > 60 ){
                          echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                            } else {
                          echo $text;
                            }
                            ?></p>
                          </div> 
                    
                        </div>
                        <?php } ?>
                        <nav aria-label="Page navigation example">
                        <ul class="pagination text-primary justify-content-center ">
                        <?php if (isset($data['page-daily'])) {
                        if ($data['page-daily'] == 1) { ?>
                            <li class="page-item"><a class="page-link" ><i class="fa fa-angle-left"></i></a></li>
                        <?php  
                        }else {
                            $link_prev = ($data['page-daily'] > 1)? $data['page-daily'] - 1 : 1;
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_prev ?>"><i class="fa fa-angle-left"></i></a></li>
                        <?php
                        }
                        for ($i= $data['start_number']; $i <= $data['end_number']; $i++) { 
                            $link_active = ($data['page-daily'] == $i)? 'active' : '';
                        ?>
                        <li class="page-item <?= $link_active ?>"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $i ?>"><?= $i ?></a></li>
                        <?php
                        }
                        if ($data['page-daily'] == $data['jumlahHalaman']) {
                        ?>
                        
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }else{
                            $link_next = ($data['page-daily'] < $data['jumlahHalaman'])? $data['page-daily'] + 1 : $data['jumlahHalaman'];
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_next ?>""><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }
                        }else{?>
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-left"></i></a></li>
                        <?php
                        for ($i=1; $i <= $data['jumlahHalamanDaily']; $i++) { 
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $i ?>"><?= $i ?></a></li>
                        <?php    
                        }
                        ?>
                        <?php
                        if ($data['jumlahHalamanDaily'] == 1) {
                        ?>
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }else{
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/2"><i class="fa fa-angle-right"></i></a></li>

                    
                        <?php
                        }
                        }
                        ?>
                        </ul>
                      </nav>
                  </div>
                
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Monthly</h4>
                    <a href="<?= url("addnewsmonthly") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add News Monthly </button></a>
                    <?php foreach ($data['monthly'] as $rows) { ?>
                    <div class="media pt-4">
                          <img class="align-self-start mr-3" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">
                          <div class="media-body d-none d-xl-block">
                          <h5 class="mt-0"><?= strtoupper($rows['title']) ?>
                            <span style="text-align: right;" class="align-right text-right ml-3">
                            <a href="<?= url('update-news/').$rows['url']; ?>">
                            <button type="button" style="padding: 0.1px 0.8rem;" class="btn btn-sm btn-outline-primary ">
                            <i class="mdi mdi-pencil"></i>
                            </button>
                            </a>
                            &nbsp;
                            <a href="<?= url('dalete-news/').$rows['id_news']; ?>" class="delete">
                            <button type="button" style="padding: 0.1rem 0.8rem;"  class="btn btn-sm btn-outline-danger ">
                            <i class="mdi mdi-delete"></i>
                            </button>
                            </a> 
                            </span>
                            </h5>
                            <p style="margin-top:-15px;"><?php  
                            $text = htmlspecialchars_decode($rows['content']);
                            if ( str_word_count($rows['content']) > 60 ){
                          echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                            } else {
                          echo $text;
                            }
                            ?></p>
                          </div> 
                        </div>
                        <?php } ?>
                        <nav aria-label="Page navigation example">
                        <ul class="pagination text-primary justify-content-center ">
                        <?php if (isset($data['page-monthly'])) {
                        if ($data['page-monthly'] == 1) { ?>
                            <li class="page-item"><a class="page-link" ><i class="fa fa-angle-left"></i></a></li>
                        <?php  
                        }else {
                            $link_prev = ($data['page-monthly'] > 1)? $data['page-monthly'] - 1 : 1;
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $link_prev ?>"><i class="fa fa-angle-left"></i></a></li>
                        <?php
                        }
                        for ($i= $data['start_number']; $i <= $data['end_number']; $i++) { 
                            $link_active = ($data['page-monthly'] == $i)? 'active' : '';
                        ?>
                        <li class="page-item <?= $link_active ?>"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $i ?>"><?= $i ?></a></li>
                        <?php
                        }
                        if ($data['page-monthly'] == $data['jumlahHalaman']) {
                        ?>
                        
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }else{
                            $link_next = ($data['page-monthly'] < $data['jumlahHalaman'])? $data['page-monthly'] + 1 : $data['jumlahHalaman'];
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $link_next ?>""><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }
                        }else{?>
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-left"></i></a></li>
                        <?php
                        for ($i=1; $i <= $data['jumlahHalamanMonthly']; $i++) { 
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $i ?>"><?= $i ?></a></li>
                        <?php    
                        }
                        ?>
                        <?php
                        if ($data['jumlahHalamanMonthly'] == 1) {
                        ?>
                        <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                        <?php
                        }else{
                        ?>
                        <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/2"><i class="fa fa-angle-right"></i></a></li>

                    
                        <?php
                        }
                        }
                        ?>
                        </ul>
                      </nav>
                  </div>
                </div>
              </div>
            </div>

    </div>

</div>
</div>

