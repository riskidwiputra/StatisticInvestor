<div class="main-panel ">
    <div class="content-wrapper">
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
            <i class="mdi mdi-newspaper"></i>
            </span> 
            News
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
            <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Daily</h4>
                        <?php if (Session::check('admin') == true || Session::check('superadmin') == true) { ?>
                    
                        <a href="<?= url("addnewsdaily") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add News Daily </button></a>
                        <?php } ?>
                        <?php if($data['daily']){ ?>
                        <?php foreach ($data['daily'] as $rows) { ?>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <a href="<?= url('news/').$rows['url']; ?>">
                                    <img class="align-self-start" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">
                                </a>
                            </div>
                            <div class="col-md-9 ">
                                <a href="<?= url('news/').$rows['url']; ?>">
                                <h5><?= strtoupper($rows['title']) ?>
                                </a>
                                <?php if (Session::check('admin') == true || Session::check('superadmin') == true) { ?>
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
                                <?php } ?>
                                </h5>
                                <p style="margin-top:-15px;">
                                <?php  
                                $text = htmlspecialchars_decode($rows['content']);
                                if ( str_word_count($rows['content']) > 60 ){
                                echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                } else {
                                    echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                }?>
                                </p>
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
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Monthly</h4>
                        <?php if (Session::check('admin') == true || Session::check('superadmin') == true) { ?>
                        <a href="<?= url("addnewsmonthly") ?>"> <button class="btn btn-inverse-primary"><span class="fa fa-plus-circle fa-spin"></span> Add News Monthly </button></a>
                        <?php } ?>
                        <?php if($data['monthly']){ ?>
                        <?php foreach ($data['monthly'] as $rows) { ?>
                        <div class="row mt-3">
                            <div class="col-md-3">
                                <a href="<?= url('news/').$rows['url']; ?>">
                                    <img class="align-self-start" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">
                                </a>
                            </div>
                            <div class="col-md-9 ">
                                <a href="<?= url('news/').$rows['url']; ?>">
                                <h5><?= strtoupper($rows['title']) ?>
                                </a>
                                <?php if (Session::check('admin') == true || Session::check('superadmin') == true) { ?>
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
                                <?php } ?>
                                </h5>
                                <p style="margin-top:-15px;">
                                <?php  
                                $text = htmlspecialchars_decode($rows['content']);
                                if ( str_word_count($rows['content']) > 60 ){
                                echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                } else {
                                    echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                }?>
                                </p>
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
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>


