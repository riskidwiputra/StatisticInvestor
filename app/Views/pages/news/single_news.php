<style>
#deskripsi img {
    max-width: 100%;

}
/* Extra small devices (phones, 600px and down) */


/* Small devices (portrait tablets and large phones, 600px and up) */

</style>
<div class="main-panel ">
    <div class="content-wrapper">
    
        <div class="row">
            <div class="col-lg-8 grid-margin">
                <div class="card mb-3">
       
                    <div class="card-body">
                    <h1 class="card-title" style="font-family: fantasy; font-size:30px;"><?= $data['content']['title'] ?>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab molestiae similique illum, maxime tempore quas provident ipsa! Necessitatibus recusandae culpa ad vitae iusto quisquam nisi?</h1>
                    <img class="card-img-top" src="<?= path("path_portal_News").$data['content']['image'] ?>" alt="Card image cap">
                    <div  id="deskripsi">
                        <p class="card-text" ><?=   htmlspecialchars_decode(str_replace('public/', url().'/public/', $data['content']['content'])) ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 grid-margin">
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> Latest </h3>
            </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Daily</h4>
                        <?php if($data['daily']){ ?>
                        <?php foreach ($data['daily'] as $rows) { ?>
                          <div class="row mt-4">
                            <div class="col-md-2">
                              <a href="<?= url('news/').$rows['url']; ?>">
                              <!-- <img class="" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:80%; height:100px;"> -->
                              <img class="" src="<?=asset('assets/images/1.jpg');?>" alt="Generic placeholder image" style="width:80%; height:100px;">
                              </a>
                            </div>
                            <div class="col-md-10 ">
                                <a href="<?= url('news/').$rows['url']; ?>">
                                <h4><?= strtoupper($rows['title']) ?>
                                </a>
                                </h4>
                                
                                <p style="margin-top:-15px;" >
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
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_next ?>"><i class="fa fa-angle-right"></i></a></li>
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
    </div>


