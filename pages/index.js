import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { red500, green500, blue500, white, darkBlack } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import { ActionViewList, ContentLink, NotificationSync, NotificationSyncProblem } from 'material-ui/svg-icons';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muiTheme: getMuiTheme({
        appBar: {
          color: white,
          textColor: darkBlack
        }
      })
    };
  }

  static async getInitialProps({ req }) {
    return {
      userAgent: req ? req.headers['user-agent'] : navigator.userAgent,
      mirrors: (await (await fetch('https://api.dglinux.com/mirrors')).json())
        .sort((lhs, rhs) => lhs.name < rhs.name ? -1 : lhs.name > rhs.name ? 1 : 0)
    };
  }

  render() {
    return (
      <div>
        <Head>
          <title>莞工 GNU/Linux 协会 开源软件镜像站</title>
        </Head>

        <style jsx>{`
          .header {
            font-size: 24px;
            line-height: 64px;
            margin: 0;
          }

          .mirror-status {
            display: flex;
          }

          .mt-3 {
            margin-top: calc(1rem * .5) !important;
          }

          .mt-5 {
            margin-top: calc(1rem * 3) !important;
          }

          .mb-3 {
            margin-bottom: calc(1rem * .5) !important;
          }

          .mb-5 {
            margin-bottom: calc(1rem * 3) !important;
          }

          .py-5 {
            padding-top: calc(1rem * 3) !important;
            padding-bottom: calc(1rem * 3) !important;
          }

          @media (min-width: 768px) {
            .my-sm-5 {
              margin-top: calc(1rem * 3) !important;
              margin-bottom: calc(1rem * 3) !important;
            }
          }
        `}</style>

        <MuiThemeProvider muiTheme={getMuiTheme(this.state.muiTheme, this.props.userAgent)}>
          <div>
            <Paper>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-xs-12">
                    <h1 className="header">莞工 GNU/Linux 协会 开源软件镜像站</h1>
                  </div>
                </div>
              </div>
            </Paper>
            <div className="container">
              <div className="row">
                <div className="col-sm-8 my-sm-5 col-xs-12 mt-5 mb-3">
                  {this.renderMirrorsList()}
                </div>
                <div className="col-sm-4 my-sm-5 col-xs-12 mt-3 mb-5">
                  {this.renderAside()}
                </div>
              </div>
            </div>
            <Paper>
              <div className="container py-5">
                <div className="row">
                  <div className="col-sm-8 col-xs-8">
                    <p>本站由莞工 GNU/Linux 协会开发、运行与维护。</p>
                    <p>感谢莞工 GNU/Linux 协会成员的不懈努力，感谢黄培灿老师提供的经费以及服务器，感谢大家热爱 Linux。</p>
                  </div>
                  <div className="col-sm-4 col-xs-4">
                    <img className="img-responsive pull-right" src="/static/image/logo.png" />
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  renderMirrorsList() {
    return (
      <Card>
        <CardHeader title="镜像列表" avatar={(<ActionViewList />)} />
        <CardText>
          <Table selectable={false}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>名称</TableHeaderColumn>
                <TableHeaderColumn>最后更新</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>{
              this.props.mirrors.map(mirror => (
                <TableRow key={mirror.id}>
                  <TableRowColumn>
                    <a href={mirror.href}>{mirror.name}</a>
                  </TableRowColumn>
                  <TableRowColumn style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{moment(mirror.updated_at).locale('zh-CN').calendar()}</span>
                      <div className="hidden-xs">
                        {mirror.status == 'syncing' &&
                          <Chip>
                            <Avatar color={green500} icon={<NotificationSync />} />
                            {mirror.status}
                          </Chip>
                        }
                        {mirror.status == 'failed' &&
                          <Chip>
                            <Avatar color={red500} icon={<NotificationSyncProblem />} />
                            {mirror.status}
                          </Chip>
                        }
                    </div>
                  </TableRowColumn>
                </TableRow>
              ), this)
            }</TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }

  renderAside() {
    return (
      <Card>
        <CardHeader title="相关链接" avatar={(<ContentLink />)} />
        <CardText>
          <List>
            <Link href="https://www.dglinux.com">
              <a style={{ textDecoration: 'none' }}>
                <ListItem primaryText="莞工 GNU/Linux 协会" />
              </a>
            </Link>
          </List>
        </CardText>
      </Card>
    );
  }
}
