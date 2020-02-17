<div class="main-panel mt-5">
          <div class="content-wrapper">
          
            
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-home"></i>
                </span> Dashboard </h3>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active align-middle" aria-current="page">
                    Nilai Saham Anda<br><h4 class="text-success"><?= IDR
                    ($data['saldo']); ?></h4>
                    <?php if ($data['saldo']) ?>  
                  </li>
                  
                  <li>
                  <i class="mdi mdi-wallet icon-md text-primary pl-2 align-middle d-none d-xl-block"></i>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="row">
              <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                
                      <figure class="highcharts-figure">
                        <div id="container"></div>
                        <p class="highcharts-description">
                       
                        </p>
                    </figure>

                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-danger card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Total Lembar Saham <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5"><?= Format($data['saham']['total_saham']); ?></h2> 
                  </div>
                </div>
              </div>
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-info card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Saham Perlembar <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <!-- IDR 268.000,00-, -->
                    <h2 class="mb-5"><?= IDR($data['saham']['harga_persaham']); ?></h2> 
                    <h6 class="card-text">1 Lot = 100 Lembar</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-success card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Nilai Valuatif Perusahaan  <i class="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">IDR 13.4M</h2> 
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="row">-->
            <!--  <div class="col-md-12 grid-margin stretch-card">-->
            <!--    <div class="card">-->
            <!--      <div class="card-body">-->
            <!--        <div class="clearfix">-->
            <!--          <h4 class="card-title float-left">Company Capital</h4>-->
                      
            <!--        </div>-->
            <!--        <canvas id="linechart" width="100%" height="30%"></canvas>-->
            <!--        <script  type="text/javascript">-->
            <!--            var ctx = document.getElementById("linechart").getContext("2d");-->
            <!--            var data = {-->
            <!--                      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],-->
            <!--                      datasets: [-->
            <!--                            {-->
            <!--                              label: "Laptop",-->
            <!--                              fill: false,-->
            <!--                              lineTension: 0.1,-->
            <!--                              backgroundColor: "#29B0D0",-->
            <!--                              borderColor: "#29B0D0",-->
            <!--                              pointHoverBackgroundColor: "#29B0D0",-->
            <!--                              pointHoverBorderColor: "#29B0D0",-->
            <!--                              data: [900,230,600,433,543,233,908,809,765,999,4333,888]-->
            <!--                            },-->
            <!--                            {-->
            <!--                              label: "PC",-->
            <!--                              fill: false,-->
            <!--                              lineTension: 0.1,-->
            <!--                              backgroundColor: "#2A516E",-->
            <!--                              borderColor: "#2A516E",-->
            <!--                              pointHoverBackgroundColor: "#2A516E",-->
            <!--                              pointHoverBorderColor: "#2A516E",-->
            <!--                              data: [900,230,600,433,543,233,908,809,765,999,4333,888]-->
            <!--                            },-->
            <!--                            {-->
            <!--                              label: "Monitor",-->
            <!--                              fill: false,-->
            <!--                              lineTension: 0.1,-->
            <!--                              backgroundColor: "#F07124",-->
            <!--                              borderColor: "#F07124",-->
            <!--                              pointHoverBackgroundColor: "#F07124",-->
            <!--                              pointHoverBorderColor: "#F07124",-->
            <!--                              data: [900,230,600,433,543,233,908,809,765,999,4333,888]-->
            <!--                            },-->
            <!--                            {-->
            <!--                              label: "Printer",-->
            <!--                              fill: false,-->
            <!--                              lineTension: 0.1,-->
            <!--                              backgroundColor: "#CBE0E3",-->
            <!--                              borderColor: "#CBE0E3",-->
            <!--                              pointHoverBackgroundColor: "#CBE0E3",-->
            <!--                              pointHoverBorderColor: "#CBE0E3",-->
            <!--                              data: [900,230,600,433,543,233,908,809,765,999,4333,888]-->
            <!--                            },-->
            <!--                            {-->
            <!--                              label: "Scanner",-->
            <!--                              fill: false,-->
            <!--                              lineTension: 0.1,-->
            <!--                              backgroundColor: "#979193",-->
            <!--                              borderColor: "#979193",-->
            <!--                              pointHoverBackgroundColor: "#979193",-->
            <!--                              pointHoverBorderColor: "#979193",-->
            <!--                              data: [900,230,600,433,543,233,908,809,765,999,4333,888]-->
            <!--                            }-->
            <!--                            ]-->
            <!--                    };-->

            <!--            var myBarChart = new Chart(ctx, {-->
            <!--                      type: 'line',-->
            <!--                      data: data,-->
            <!--                      options: {-->
            <!--                      legend: {-->
            <!--                        display: true-->
            <!--                      },-->
            <!--                      barValueSpacing: 20,-->
            <!--                      scales: {-->
            <!--                        yAxes: [{-->
            <!--                            ticks: {-->
            <!--                                min: 0,-->
            <!--                            }-->
            <!--                        }],-->
            <!--                        xAxes: [{-->
            <!--                                    gridLines: {-->
            <!--                                        color: "rgba(0, 0, 0, 0)",-->
            <!--                                    }-->
            <!--                                }]-->
            <!--                        }-->
            <!--                    }-->
            <!--                  });-->
            <!--          </script>-->
            <!--      </div>-->
            <!--    </div>-->
            <!--  </div>-->
            <!--</div>-->
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> News </h3>
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
                    <div class="media">
                          <img class="align-self-start mr-3" src="<?=asset('assets/images/r6s-shiftingtides-bg-header_358641.jpg');?>" alt="Generic placeholder image" style="width:200px;">
                          <div class="media-body d-none d-xl-block">
                            <h5 class="mt-0">Rainbow Six: Siege Operation Shifting Tides Tambah Operator dan Rombak Bentuk Map</h5>
                            <p>Berasal dari India, Kali diceritakan sebagai pemimpin pasukan militer privat milik sebuah perusahaan. Mewakili kata “Tides”, Operator dengan medium armor/medium speed ini membawa senjata yang sangat mematikan, CSRX 300 rifle. Senjata ini jadi mematikan karena bisa langsung menumbangkan musuh dengan satu kali tembak saja. Gadget ini berbentuk piringan, dapat dilempar, dan akan menempel ke permukaan di tempat Mag-NET dilempar. Setelahnya, semua proyektil yang dilempar Attacker akan ditarik oleh Mag-NET jika melewati area sekitar Mag-NET tertempel. Satu Mag-NET hanya bisa menarik satu proyektil saja, d....<u>Selengkapnya</u></p>
                          </div> 
                        </div>
                        <div class="row d-xl-none mt-2">
                            <div class="col-12">
                                <h5>Rainbow Six: Siege Operation Shifting Tides Tambah Operator dan Rombak Bentuk Map</h5>
                                <p>Berasal dari India, Kali diceritakan sebagai pemimpin pasukan militer privat milik sebuah perusahaan. Mewakili kata “Tides”, Operator dengan medium armor....<u>Selengkapnya</u></p>
                            </div>
                        </div>
                        <div class="media">
                          <img class="align-self-start mr-3" src="<?=asset('assets/images/1.jpg');?>" alt="Generic placeholder image" style="width:200px;">
                          <div class="media-body d-none d-xl-block">
                            <h5 class="mt-0">Tinggalkan AR, Riot Games Gunakan Teknologi Hologram Pada Pembukaan Final Worlds 2019</h5>
                            <p>Dimulai dari penampilan Valerie Broussard yang membawakan lagu Awaken, True Damage yang melakoni debutnya dengan lagu GIANTS, Chrissy Costanza dan Cailin....<u>Selengkapnya</u></p>
                          </div>
                        </div>
                        <div class="row d-xl-none mt-2">
                            <div class="col-12">
                                <h5>Tinggalkan AR, Riot Games Gunakan Teknologi Hologram Pada Pembukaan Final Worlds 2019</h5>
                                <p>Dimulai dari penampilan Valerie Broussard yang membawakan lagu Awaken, True Damage yang melakoni debutnya dengan lagu GIANTS, Chrissy Costanza dan Cailin Russo yang....<u>Selengkapnya</u></p>
                            </div>
                        </div> 
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Monthly</h4>
                    <div class="media">
                          <img class="align-self-start mr-3" src="<?=asset('assets/images/OG-Juara-The-International-Dota-2-TI9-Sejarah-Baru-Tercipta.png');?>" alt="Generic placeholder image" style="width:200px;">
                          <div class="media-body d-none d-xl-block">
                            <h5 class="mt-0">OG Juara The International 2019 (TI9), Sejarah Baru Tercipta!</h5>
                            <p>OG akhirnya menjadi juara di turnamen The International Dota 2 tahun 2019 (TI9). Skuad dari Eropa ini menyelesaikan kisah Cinderella keduanya di turnamen Dota 2 terbesar di dunia dengan mengalahkan Team Liquid di grand final acara TI9 tersebut. Kemenangan ini mencatatkan laju dominan team OG di ajang TI9 dan mendapatkan hadiah sebesar $15.578.510 atau kurang lebih setara dengan Rp. 222 Milliar!<u>Selengkapnya</u></p>
                          </div>
                        </div>
                        <div class="row d-xl-none mt-2">
                            <div class="col-12">
                                <h5>OG Juara The International 2019 (TI9), Sejarah Baru Tercipta!</h5>
                                <p>OG akhirnya menjadi juara di turnamen The International Dota 2 tahun 2019 (TI9). Skuad dari Eropa ini menyelesaikan kisah Cinderella keduanya di turnamen Dota 2 terbe....<u>Selengkapnya</u></p>
                            </div>
                        </div>
                        <div class="media">
                          <img class="align-self-start mr-3" src="<?=asset('assets/images/032031100_1564393927-MLBB3.jpg');?>" alt="Generic placeholder image" style="width:200px;">
                          <div class="media-body d-none d-xl-block">
                            <h5 class="mt-0">11 Cosplay Mobile Legends (ML) yang Akan Buatmu Mimisan</h5>
                            <p>Mobile Legends saat ini adalah game Moba terdepan di Indonesia. Deretan pro player, turnamen tingkat dunia hingga berbagai perlombaan cosplay membuat popularitas game Mobile Legends (ML) ini semakin meningkat dari waktu ke waktu. Tidak mengherankan para cosplayer berlomba lomba berkreasi untuk membuat karakternya menjadi semakin hidup....<u>Selengkapnya</u></p>
                          </div>
                        </div>
                        <div class="row d-xl-none mt-2">
                            <div class="col-12">
                                <h5>11 Cosplay Mobile Legends (ML) yang Akan Buatmu Mimisan</h5>
                                <p>Mobile Legends saat ini adalah game Moba terdepan di Indonesia. Deretan pro player, turnamen tingkat dunia hingga berbagai perlombaan cosplay membuat popularitas game Mobile Legends ....<u>Selengkapnya</u></p>
                            </div>
                        </div> 
                  </div>
                </div>
              </div>
            </div>
            <div class="page-header">
              <h6 class="page-title" style="font-size:16px;">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> Company Cash Flow Report </h6>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"> 
                  </li>
                </ul>
              </nav>
            </div>
            <div class="row">
              <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body"> 
                        <div class="row">
                            <div class="mx-auto">
                                <button class="btn btn-outline-primary"><i class="mdi mdi-cloud-download"></i> Download Report</button> 
                            </div>
                        </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script>
// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Grafik Saham Investor'
    },
    subtitle: {
        text: ' '
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total lembar saham (<?= Format($data['saham']['total_saham']); ?>)'
        }

    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y} Lembar</b> of 50.000 Lembar<br/>'
    },

    series: [
        {
            name: "<?= $data['saham']['name_saham'] ?>",
            colorByPoint: true,
            data: [
              <?php foreach ($data['investasi'] as $rows) {
              echo '{name:"'.$rows['id_investor'].'",y:'.$rows['total_saham'].',drilldown:"Chrome"},';
              } 
              ?>
            ]
        }
    ]
});
</script>