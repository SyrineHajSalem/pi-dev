import { UsersService } from 'src/app/core/services/users.service';

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private usersService: UsersService) {
    for (var i = 10; i < 95; i++) {
      this.ages.push({
        _id: i,
        count: 0,
      });
    }
  }
  users:any
  stat: any;
  ngOnInit(): void {
    this.getAll();
  }
  ages: any = [];
  getAll() {
    Chart.register(...registerables);

    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.usersService.getAllUsersByGoub().subscribe((res: any) => {
      const labels = res.map((item: any) => item._id);
      const data = res.map((item: any) => item.count);
      const myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: labels,

          datasets: [
            {
              label: 'Votes',
              data: data,
              backgroundColor: ['#1775a3'],
              borderColor: ['#1775a3'],
              borderWidth: 1,

              barPercentage: 0.7,
              barThickness: 30,
              borderRadius: 8,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: false,
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              padding: 20,
              color: 'black',
              text: '',
              font: {
                size: 16,
              },
              align: 'start',
            },
          },
        },
      });
    });

    this.usersService.getAllUsersByGenre().subscribe((res: any) => {
      const labels = res.map((item: any) => item._id);
      const data = res.map((item: any) => item.count);
      console.log(data);
      const myPieTwo = new Chart('myPieTwo', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Les Status',
              data: data,
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
              hoverOffset: 4,
            },
          ],
        },
      });
    });
    this.usersService.getAllUsersByAge().subscribe((res: any) => {
      for (var i = 10; i < this.ages.length - 1; i++) {
        res.map((j: any) => {
          console.log(j._id);
          if (j._id == this.ages[i]._id) {
            this.ages[i].count = j.count;
          }
        });
      }
      console.log(this.ages);
      const labels = this.ages.map((item: any) => item._id);
      const data = this.ages.map((item: any) => item.count);
      console.log(data);
      const myPieAge = new Chart('myPieAge', {
        type: 'line',
        data: {
          labels: labels,

          datasets: [
            {
              label: 'Votes',
              data: data,
              backgroundColor: ['#1775a3'],
              borderColor: ['#1775a3'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: false,
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              padding: 20,
              color: 'black',
              text: 'Nobmre des utilisateur par age',
              font: {
                size: 16,
              },
              align: 'start',
            },
          },
        },
      });
    });
    // this.statistiqueService.getAll().subscribe(res=>{
    //   this.stat = res
    //   console.log(res);
    //   const labels = Object.keys(this.stat.countByStatus);
    //   const data = Object.values(this.stat.countByStatus);
    //   const labelsBar = Object.keys(this.stat.countByCategory);
    //   const dataBar = Object.values(this.stat.countByCategory);
    //   console.log(data);
    //   const myPieTwo = new Chart('myPieTwo', {
    //     type: 'pie',
    //     data: {
    //       labels:labels,
    //       datasets: [
    //         {
    //           label: 'Les Status',
    //           data: data,
    //           backgroundColor: [
    //             'rgb(54, 162, 235)',
    //             'rgb(255, 99, 132)',
    //             'rgb(0, 205, 86)',
    //             'rgb(255, 205, 86)',
    //           ],
    //           hoverOffset: 4,
    //         },
    //       ],
    //     },
    //   });

    //   const myChart = new Chart('myChart', {
    //     type: 'bar',
    //     data: {
    //       labels: labelsBar,

    //       datasets: [
    //         {
    //           label: 'Votes',
    //           data: dataBar,
    //           backgroundColor: ['#1775a3'],
    //           borderColor: ['#1775a3'],
    //           borderWidth: 1,

    //           barPercentage: 0.7,
    //           barThickness: 30,
    //           borderRadius: 8,
    //         },
    //       ],
    //     },
    //     options: {
    //       scales: {
    //         y: {
    //           title: {
    //             display: false,
    //           },
    //           beginAtZero: true,
    //         },
    //       },
    //       plugins: {
    //         legend: {
    //           display: false,
    //         },
    //         title: {
    //           display: true,
    //           padding: 20,
    //           color: 'black',
    //           text: 'Nobmre des formation disponible par category',
    //           font: {
    //             size: 16,
    //           },
    //           align: 'start',
    //         },
    //       },
    //     },
    //   });

    // })
  }
}
