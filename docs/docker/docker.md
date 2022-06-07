---
title: Docker笔记
date: 2022-06-01
sidebar: true
sidebarDepth: 5
tags:
- "Docker"
- Java
categories:
- "后端"
- "Docker"
isShowComments: true
---

## 基本容器命令

```shell
# 搜索镜像
- docker search IMAGE
# 拉取镜像
- docker pull IMAGE
# 查看镜像、容器、数据卷所占空间
- docker system df
# 删除镜像
- docker rmi IMAGE
# 启动容器
- docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  OPTION说明
    - --name="容器新名称" ：为容器指定一个名称，便于区分统一镜像的不同实例。
    - -d：后台运行容器，也即启动守护式容器。
    - -i：以交互模式运行（interactive），通常与-t同时使用。
    - -t：为容器重新分配一个伪输入终端（tty），通常与 -i同时使用。
      - -i 与-t同时使用即-it表示启动交互式容器（前台有伪终端，等待交互） 
    - -p：小写的-p指定端口映射。
    - -P：大写的-p随机端口映射。
      - -p与-P格式：
        - -p hostPort:containerPort 端口映射 -p 8080:80  主机端口:docker内容器端口
        - -p ip:hostPort:containerPort  配置监听地址 -p 192.168.168.200:8080:80
        - -p ip::containerPort  随机分配端口 -p 192.168.168.200::80
        - -p hostPort:containerPort:udp  指定协议 -p 8080:80:tcp
        - -p hostPort:containerPort  -p hostPort:containerPort  指定多个  -p 8080:80 -p 63389:3389
  COMMANSD
    - /bin/bash：载入容器后运行bash
# 列出当前所有正在运行的容器
- docker ps [OPTIONS]
OPTIONS说明
  - -a：列出所有正在运行和运行过的容器。
  - -l：显示最近创建的容器
  - -n：显示最近n个创建的容器
  - -q：静默模式，只显示容器的编号
# 退出容器
- 使用exit命令退出：容器停止。
- 使用ctrl+p+q快捷键退出，容器不会停止。
# 启动已经停止的容器
- docker start 容器ID或容器名
# 重启容器
- docker restart 容器ID或容器名
# 停止容器
- docker stop 容器ID或容器名
# 强制停止容器
- docker kill 容器ID或容器名
# 删除已停止容器
- docker rm 容器ID或容器名
# 强制删除容器（运行中）
- docker rm -f 容器ID或容器名
# 一次性删除多个容器
- docker ps -a -q |xargs docker rm
- docker rm -f $(docker ps -a -q)
```

## 重要容器操作

### 重要命令

```shell
# 前台交互式启动 
docker run --name="redis-01" -it redis 
# 后台守护式启动
docker run --name="redis-02" -d  redis
# 查看容器日志
docker logs 容器ID或容器名
# 查看容器内运行的进程
docker ps
docker top 容器ID或容器名
# 查看容器内部详情
docker inspect 容器ID或容器名
```



### 自动重启容器

#### --restart=always参数能够使我们在重启docker时，自动启动相关容器。

Docker容器的重启策略如下：

no ：默认策略，在容器退出时不重启容器

on-failure ：在容器非正常退出时（退出状态非0），才会重启容器

on-failure:3 ：在容器非正常退出时重启容器，最多重启3次

always ：在容器退出时总是重启容器

unless-stopped ：在容器退出时总是重启容器，但是不考虑在Docker守护进程启动时就已经停止了的容器

### 进入运行中容器，并以命令行交互

```shell
# 进入正在运行的容器，并以命令行交互
docker exec -it 容器ID或容器名 /bin/bash
docker attach 容器ID或容器名
## 区别：
###  exec 在容器中打开新的终端，并可以2启动新的进程，用exit退出不会导致容器的停止
###  attach 直接进入容器启动命令的终端，不会启动新进程，用exit退出会导致容器停止
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652531289464-8098ee08-5280-4741-9c2a-45fbb09af7a3.png)

### 容器内文件拷贝到主机

```shell
# 容器内文件拷贝到主机
docker cp 容器ID或容器名:容器内路径  目的主机路径
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652531997848-4093d828-da34-4357-9b4d-cda444cf6fa5.png)

### 更多命令梳理

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652535883814-0a0c23d6-9f9d-431f-a5cc-422788835ebf.png)

```shell
attach    # 当前 shell 下 attach 连接指定运行镜像
build     # 通过 Dockerfile 定制镜像
commit    # 提交当前容器为新的镜像
cp        #从容器中拷贝指定文件或者目录到宿主机中
create    # 创建一个新的容器，同 run，但不启动容器
diff      # 查看 docker 容器变化
events    # 从 docker 服务获取容器实时事件
exec      # 在已存在的容器上运行命令
export    # 导出容器的内容流作为一个 tar 归档文件[对应 import ]
history   # 展示一个镜像形成历史
images    # 列出系统当前镜像
import    # 从tar包中的内容创建一个新的文件系统映像[对应export]
info      # 显示系统相关信息
inspect   # 查看容器详细信息
kill      # kill 指定 docker 容器
load      # 从一个 tar 包中加载一个镜像[对应 save]
login     # 注册或者登陆一个 docker 源服务器
logout    # 从当前 Docker registry 退出
logs      # 输出当前容器日志信息
port      # 查看映射端口对应的容器内部源端口
pause     # 暂停容器
ps        # 列出容器列表
pull      # 从docker镜像源服务器拉取指定镜像或者库镜像
push      # 推送指定镜像或者库镜像至docker源服务器
restart   # 重启运行的容器
rm        # 移除一个或者多个容器
rmi       # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]
run       # 创建一个新的容器并运行一个命令
save      # 保存一个镜像为一个 tar 包[对应 load]
search    # 在 docker hub 中搜索镜像
start     # 启动容器
stop      # 停止容器
tag       # 给源中镜像打标签
top       # 查看容器中运行的进程信息
unpause   # 取消暂停容器
version   # 查看 docker 版本号
wait      # 截取容器停止时的退出状态值
```



## 导入导出容器

```shell
# 导出容器
docker export 容器ID或容器名 > 保存路径/文件名.tar
# 导入容器
cat 路径/文件名.tar | docker import - 镜像用户/镜像名:镜像版本号
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652533668770-472b447d-9823-439c-8047-b8a92cd57b02.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652534153684-041c074a-2baa-4abd-a7d5-27393b5833d4.png)##

## 提交容器副本生成新镜像

- `docker commit -m="描述" -a="作者" 容器ID或容器名 新镜像名:版本号`

官网拉取的ubuntu没有vim命令，我们安装增加了vim功能后，使用commit构建新的镜像。该镜像本身就带有vim命令了。

```shell
# 以命令行交互模式进入docker的ubuntu容器
docker exec -it 07249834df7f /bin/bash
# 更新包管理工具
apt-get update
# 安装 vim 工具
apt-get install vim
# 提交容器副本生成新镜像
docker commit -m="安装vim工具" -a="刘杨" ubuntu-01 myubuntu:1.0
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652676910460-86122702-279c-4937-800e-b4382389e7a1.png)

## 阿里云个人镜像仓库使用

### 阿里云个人镜像仓库配置

登录阿里云进入容器镜像服务：

-  https://cr.console.aliyun.com/cn-beijing/instances

#### 创建命名空间（已有就不用创建了）

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652580439612-172a26a4-f8b3-47c6-9f0b-74f0158e1a51.png)

#### 创建镜像仓库（一个镜像对应一个仓库名称）

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652675736018-52058bd2-03e3-484e-ac3e-39002368ef5e.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652580736282-86036b86-e219-449e-86a6-9d4e5446b5c9.png)

#### 阿里云个人镜像仓库操作指南

```shell
# 1. 登录阿里云Docker Registry
$ docker login --username=liuyangv registry.cn-qingdao.aliyuncs.com
  - 用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。
  - 您可以在访问凭证页面修改凭证密码。

# 2. 将镜像推送到Registry
# 	提交容器副本生成新镜像
$ docker commit -m="安装vim工具" -a="刘杨" ubuntu myubuntu:1.0
#		登录阿里云个人镜像仓库
$ docker login --username=liuyangv registry.cn-qingdao.aliyuncs.com
#		按阿里格式生成新镜像
$ docker tag [ImageId] registry.cn-qingdao.aliyuncs.com/liuyangspace/ubuntu:[镜像版本号]
#		将镜像推送到阿里云个人镜像仓库
$ docker push registry.cn-qingdao.aliyuncs.com/liuyangspace/ubuntu:[镜像版本号]
  - 请根据实际镜像信息替换示例中的[ImageId]和[镜像版本号]参数。
  
# 3. 从Registry中拉取镜像
$ docker pull registry.cn-qingdao.aliyuncs.com/liuyangspace/ubuntu:[镜像版本号]
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652675852776-858b8feb-b8a1-4a6b-94ac-d60fa25fb818.png)

### 将本地镜像推送到阿里云个人镜像仓库

- 将安装vim后的ubuntu镜像推送到阿里云个人镜像仓库中

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652677251353-6f8c42f6-a967-48af-bdc2-60ea8e4fb686.png)

### 下载阿里云个人镜像仓库的镜像

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652678258733-eb51b7c8-757c-4d4c-bc80-de9ab2fba551.png)



## Docker Registry 私有镜像库配置

### 镜像库

- 官方：Docker Hub。国内访问慢。不推荐使用。
- 阿里云：容器镜像服务-镜像仓库。推荐使用。
- 私有镜像库：DockerRegistry，官方提供的用于构建私有镜像仓库。

### 创建私有镜像库

- `docker pull registry`

默认情况，仓库被创建在容器的/var/lib/registry目录下，建议自行容器卷映射，方便与宿主机联调。

- `docker run -d -p 5000:5000 --name="myregistry" -v /home/registry:/tmp/registry --privileged=true registry`
- `vim /etc/docker/daemon.json`。registry 默认不支持http访问，需要修改配置。

```json
$ vim /etc/docker/daemon.json

{
  "registry-mirrors": ["https://hhzmgrxs.mirror.aliyuncs.com"],
  "insecure-registries":["192.168.168.28:5000"]
}
systemctl daemon-reload
systemctl restart docker 
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652679173901-e075ca3d-5d3d-438a-8202-f81ff1a77e2d.png)

- 查看里面的容器： `curl -XGET http://192.168.168.28:5000/v2/_catalog`

- - {"repositories":[]}	

### 将镜像发布到私有镜像库中

- 配置好的容器打包镜像文件：`docker tag [Imageid]或[Repository:Tag] 私库ip:port/新镜像名称:版本号`

- - `docker tag ea4f9b4f2301 192.168.168.28:5000/myubuntu:2.0`
  - `docker tag myubuntu:2.0 192.168.168.28:5000/myubuntu:2.0`

- 打包好的镜像发布到私有库：`docker push [Repository:Tag]`

- - `docker push 192.168.168.28:5000/myubuntu:2.0`

安装完net-tools工具的容器提交为新镜像。（提交容器副本生成新镜像）

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652678969966-eef1a32d-419b-43a5-8175-6a98064f3976.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652680016499-62e7b581-c124-41a0-82a3-764ec026faba.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652681058843-2b22001d-95bd-4673-8b60-079624931dd8.png)

### 拉取私有镜像库镜像

- docker pull 私有镜像库ip:port/repositories
- `docker pull 192.168.168.28:5000/myubuntu:2.0`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652681450130-b6a968e1-971c-41e3-a573-d12fb6372336.png)

## 

## 容器数据卷

Docker挂载主机目录访问 添加 `--privileged=true` 参数。不然可能报错。 开启后容器内的root拥有真正的root权限。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652621181863-b318f78c-ef27-4729-8421-0a12dd54b8f4.png)

卷就是目录或文件，卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷。

有点类似我们Redis里面的rdb和aof文件。将docker容器内的数据保存进宿主机的磁盘中。

### 运行一个带有容器卷存储功能的容器实例

- `docker run -it --privileged=true -v 宿主机绝对路径目录:/容器内目录  镜像名`

- - `docker run -it --privileged=true -v 宿主机绝对路径目录:/容器内目录:rw  镜像名`  默认读写
  - `docker run -it --privileged=true -v 宿主机绝对路径目录:/容器内目录:ro  镜像名`  容器内只读

### 查看数据卷挂载情况

- `docker inspcet 容器ID`

```shell
# 运行一个带有容器卷存储功能的容器实例
docker run  -it --privileged=true -v /tmp/host_data:/tmp/docker_data --name=u1 d2e4e1f51132
# 查看数据卷挂载情况
docker inspect u1
```

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652622437952-8d26bf21-7a2f-47b2-93c2-3efcd6b6faf0.png)



### 卷的继承和共享

#### 1. 父容器完成和宿主机的映射

- `docker run -it --privileged=true -v /home/mydocker/u:/tmp/u --name=u1 ea4f9b4f2301 /bin/bash`

#### 2. 子容器继承父容器的卷规则

- `docker run -it --privileged=true --volumes-from u1 --name=u2 ea4f9b4f2301 /bin/bash`

两个容器的/tmp/u目录都挂载映射在宿主机的/home/mydocker/u目录上。两个容器和主机共享该目录。任何一个人修改其余两个都可试试读取到。某台机器停掉期间该目录文件有变更，连接后还是能获取到。



## Docker上安装常用软件

搜索镜像->拉取镜像->查看镜像->启动镜像【端口映射】->停止容器->移除容器

### Tomcat常规安装步骤

1. `docker search tomcat`。 或去 docker hub上面查找天Tomcat镜像。
2. `docker pull tomcat`。  不加版本号默认获取latest版本。
3. `docker images tomcat`。  查看Tomcat镜像。
4. `docker run -d -p 8080:8080 --name=tomcat-01 tomcat`。  使用Tomcat镜像创建容器实例（启动运行镜像）。

- 访问报404，因为webapps里面是空的。

1. `docker exec -it tomcat-01 bash`。  以交互模式进入容器。
2. `cp webapps.dist/* webapps -r`。   将 webapps.dist 默认网站内容复制到 webapps 中。
3. 访问8080端口。
4. `docker stop tomcat-01`

### MySQL常规安装步骤

#### 简单版MySQL安装

1. `docker pull mysql`。 拉取最新MySQL镜像包。
2. `docker run -p 63306:3306 --name=mysql-01 -e MYSQL_ROOT_PASSWORD=root -d mysql`。使用MySQL镜像，创建容器实例。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1652778385374-044e40f8-2c79-4625-9a03-2e8a9fbb97e5.png)

1. `docker exec -it mysql-01 bash`。 以交互模式进入容器。
2. `mysql -u root -p`。登录MySQL数据库。

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

mysql> create database liuyang01;
Query OK, 1 row affected (0.02 sec)

mysql> use liuyang01;
Database changed

mysql> create table test01(id int, name varchar(50));
Query OK, 0 rows affected (0.03 sec)

mysql> insert into test01 values(1,'liuyang');
Query OK, 1 row affected (0.02 sec)

mysql> select * from test01;
+------+---------+
| id   | name    |
+------+---------+
|    1 | liuyang |
+------+---------+
1 row in set (0.00 sec)

mysql> show variables like 'character%';
+--------------------------+--------------------------------+
| Variable_name            | Value                          |
+--------------------------+--------------------------------+
| character_set_client     | latin1                         |
| character_set_connection | latin1                         |
| character_set_database   | utf8mb4                        |
| character_set_filesystem | binary                         |
| character_set_results    | latin1                         |
| character_set_server     | utf8mb4                        |
| character_set_system     | utf8mb3                        |
| character_sets_dir       | /usr/share/mysql-8.0/charsets/ |
+--------------------------+--------------------------------+
8 rows in set (0.01 sec)
```

1. docker中刚安装的MySQL，插入中文数据报错。因为默认使用拉丁（latin1）编码字符集。（需要解决）
2. 安装的简单版MySQL容器删除后，里面的数据也会消失。（需要解决）

#### 实战版MySQL安装配置

1. 运行镜像创建容器实例（数据卷方式）。

docker run -p 63306:3306  --name=mysql-01 \ 

-v /home/mysql/log:/var/log/mysql \

-v /home/mysql/data:/var/lib/mysql \

-v /home/mysql/conf:/etc/mysql/conf.d \

--privileged=true \

-e MYSQL_ROOT_PASSWORD=root \

-d mysql 

```shell
# 后台守护式启动，指定端口映射, 指定容器实例名称
docker run -p 63306:3306 --name=mysql-01 
# 数据卷挂载（将数据从宿主机挂载到容器中）
-v /home/mysql/log:/var/log/mysql
-v /home/mysql/data:/var/lib/mysql
-v /home/mysql/conf:/etc/mysql/conf.d
# 授予特权（相当于root权限）
--privileged=true
# 数据库root用户密码
-e MYSQL_ROOT_PASSWORD=root
# 镜像文件
-d mysql 
```

1. 在数据卷的配置文件目录创建并编辑配置

```shell
$ cd  /home/mysql/conf/
$ vim my.cnf
# 配置文件内容如下：
[client]
default_character_set=utf8
[mysqld]
collation_server=utf8_general_ci
character_set_server=utf8
```

1. 重新启动MySQL容器实例

- `docker restart mysql-01`

1. 测试插入中文数据
2. 容器删除后data数据卷目录还会存在。重新创建实例后，数据卷指向此目录数据继续正常使用。

### Redis常规安装

#### 简单版Redis安装

1. `docker pull redis`。
2. `docker run -d -p 6379:6379 --name=redis-01 redis`。
3. `docker exec -it redis-01 bash`。
4. `redis-cli`。连接Redis客户端。

```shell
root@ubuntu:~# docker exec -it redis-01 bash
root@e3d547bdac9f:/data# redis-cli
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379>
```



#### 实战版Redis安装配置

1. 宿主机创建Redis配置文件目录和配置文件。

- `mkdir -p /home/redis`

1. 将默认的 redis.conf 配置文件模板拷贝到 /home/redis 目录中。
2. `vim /home/redis/redis.conf`。修改配置文件。

```properties
# 开启redis验证: 取消注释，维护验证密码（可选）
requirepass 123456

# 允许redis外地连接: 注释掉#bind 127.0.0.1
#bind 127.0.0.1

# 数据库数量: 默认16个
databases 16

# daemonize yes注释掉或改为 no : 改配置如果为yes和docker run -d 参数冲突，导致容器启动失败（Linux默认no）
daemonize no

# 开启redis数据持久化（可选）
appendonly yes
```

1. 运行

docker run -p 6379:6379 --name=redis-01 \

-v /home/redis/redis.conf:/etc/redis/redis.conf \

-v /home/redis/data:/data \

--privileged=true \

-d redis \

redis-server /etc/redis/redis.conf

```properties
# 指定端口映射, 指定容器实例名称
docker run -p 6379:6379 --name=redis-01
# 数据卷挂载（将数据从宿主机挂载到容器中）
-v /home/redis/redis.conf:/etc/redis/redis.conf
-v /home/redis/data:/data
# 授予特权（相当于root权限）
--privileged=true
# 后台守护式启动, 镜像文件
-d redis
# 指定配置文件启动redis服务
redis-server /etc/redis/redis.conf
```

1. `docker exec -it redis-01 /bin/bash`。
2. `redis-cli`。连接Redis客户端。

```shell
root@ubuntu:~# docker exec -it redis-01 /bin/bash
root@e3d547bdac9f:/data# redis-cli
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> select 17
(error) ERR DB index is out of range
127.0.0.1:6379> select 15
OK
127.0.0.1:6379[15]> 
```

1. 测试调整宿主机配置文件docker中的redis容器是否有变化。

- `vim /home/redis/redis.conf`。设置 databases 20。
- 重启docker 的 redis。连接客户端执行 select 19验证（0-19）



## 高级篇-Docker复杂配置安装

### MySQL主从复制Docker版

#### 创建主服务容器实例3307

1. 启动主MyS QL容器

docker run -p 3307:3306 --name=mysql-master \

-v /mydata/mysql-master/data:/var/lib/mysql \

-v /mydata/mysql-master/log:/var/log/mysql \

-v /mydata/mysql-master/conf:/etc/mysql/conf.d \

-e MYSQL_ROOT_PASSWORD=root \

--privileged=true \

--restart=unless-stopped \

-d mysql

```shell
# 端口映射, 容器名称
$ docker run -p 3307:3306 --name=mysql-master \
# 挂载数据文件 持久化到主
-v /mydata/mysql-master/data:/var/lib/mysql \
# 挂载日志
-v /mydata/mysql-master/log:/var/log/mysql \
# 挂载配置文件
-v /mydata/mysql-master/conf:/etc/mysql/conf.d \
# 指定数据库root用户的密码
-e MYSQL_ROOT_PASSWORD=root \
# 挂载文件权限设置
--privileged=true \
# docker重启时容器也重启
--restart=unless-stopped \
-d mysql
```

1. 编辑配置文件。`vim /mydata/mysql-master/conf/my.cnf`

```shell
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=1001
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql
## 开启二进制日志功能
log-bin=ly01-mysql-bin
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed
## 二进制日志过期清理时间。默认值:0，表示不自动清理。
expire_logs_days=7
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为只从数据库数据不一致。
slave_skip_errors=1062
```

1. 重启master实例

- `docker restart mysql-master`

1. 进入`mysql-master`容器

- `docker exec -it mysql-master /bin/bash`
- `mysql -u root -p`

1. master容器实例内创建数据同步用户

- `create user 'slave'@'%' identified by 'root';`
- `grant replication slave, replication client on *.* to 'slave'@'%';`



#### 创建从服务容器实例3308

1. 启动从MyS QL容器

docker run -p 3308:3306 --name=mysql-slave \

-v /mydata/mysql-slave/data:/var/lib/mysql \

-v /mydata/mysql-slave/log:/var/log/mysql \

-v /mydata/mysql-slave/conf:/etc/mysql/conf.d \

-e MYSQL_ROOT_PASSWORD=root \

--privileged=true \

--restart=unless-stopped \

-d mysql

```shell
# 端口映射, 容器名称
$ docker run -p 3308:3306 --name=mysql-slave \
# 挂载数据文件 持久化到主
-v /mydata/mysql-slave/data:/var/lib/mysql \
# 挂载日志
-v /mydata/mysql-slave/log:/var/log/mysql \
# 挂载配置文件
-v /mydata/mysql-slave/conf:/etc/mysql/conf.d \
# 指定数据库root用户的密码
-e MYSQL_ROOT_PASSWORD=root \
# 挂载文件权限设置
--privileged=true \
# docker重启时容器也重启
--restart=unless-stopped \
-d mysql
```

1. 编辑配置文件。`vim /mydata/mysql-slave/conf/my.cnf`

```shell
[mysqld]
## 设置server_id，同一局域网中需要唯一
server_id=1002
## 指定不需要同步的数据库名称
binlog-ignore-db=mysql
## 开启二进制日志功能,以备slave作为其他数据库实例的master时使用。
log-bin=ly02-mysql-bin
## 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M
## 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=mixed
## 二进制日志过期清理时间。默认值:0，表示不自动清理。
expire_logs_days=7
## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
## 如：1062错误是指一些主键重复，1032错误是因为只从数据库数据不一致。
slave_skip_errors=1062
## relay_log配置中继日志
relay_log=ly02-mysql-relay-bin
## log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1
## slave设置为只读（具有super权限的用户除外）
read_only=1
```

1. 重启slave实例

- `docker restart mysql-slave`

1. 在master数据库中查看主从同步状态

- `show master status;`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653027452789-75747cef-7381-4e46-a030-36a60f160457.png)

\5. 进入`mysql-slave`容器

- `docker exec -it mysql-slave /bin/bash`
- `mysql -u root -p`

1. 在从数据库中 配置主从复制

```sql
change master to master_host='192.168.168.28', master_user='slave', master_password='root', master_port=3307, 
master_log_file='ly01-mysql-bin.000001', master_log_pos=156, master_connect_retry=30;
```

1. 在从数据库中查看主从同步状态

- `show slave status \G;`
- 主要看Slave_IO_Running和Slave_SQL_Running，目前都为No状态。

1. 在从数据库中开启主从同步

- `start slave;`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653028607951-61111eef-3927-46dd-810c-d32aa5b4f837.png)

故障原因：在MySQL8.0之前，身份验证的插件是mysql_native_password，在MySQL 8.0中，caching_sha2_password 是默认的身份验证插件，安全性更高。https://www.cnblogs.com/zgrey/p/15398633.html

**解决方案一：**

使用复制用户请求服务器公钥：
`mysql -u slave -proot -h 192.168.168.28 -P3307 --get-server-public-key` 或

```
mysql -u slave -proot -h 192.168.168.28 -P3307 --server-public-key-path=/mydata/mysql-slave/conf/public_key1.pem
```

- 停止主从复制，清空主从复制配置信息，重新配置主从复制。

- - stop slave;      reset slave;      change master to ...

- 在这种情况下，服务器将RSA公钥发送给客户端，后者使用它来加密密码并将结果返回给服务器。

**解决方案二：**

修改复制账户，避免使用插件caching_sha2_password

```
create user 'slave'@'%' identified with 'mysql_native_password' by 'root';
```

1. 查看从数据库状态发现已经同步

- `show slave status \G;`
- Slave_IO_Running、Slave_SQL_Running都为yes状态表示主从配置成功。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653029773919-777b1296-76d4-48f8-bac9-5ffafbbe8d58.png)

1. 主从复制测试

- 主数据库创建创建库创建表。
- 通过从数据库进行查看是否已存在。



## 三主三从Redis集群配置

### 主从配置

1. 启动Redis容器

```shell
docker run -d --name=redis-node-01 --net host --privileged=true -v /mydata/redis/redis-node-01:/data redis --cluster-enabled yes --appendonly yes --port 6381
docker run -d --name=redis-node-02 --net host --privileged=true -v /mydata/redis/redis-node-02:/data redis --cluster-enabled yes --appendonly yes --port 6382
docker run -d --name=redis-node-03 --net host --privileged=true -v /mydata/redis/redis-node-03:/data redis --cluster-enabled yes --appendonly yes --port 6383
docker run -d --name=redis-node-04 --net host --privileged=true -v /mydata/redis/redis-node-04:/data redis --cluster-enabled yes --appendonly yes --port 6384
docker run -d --name=redis-node-05 --net host --privileged=true -v /mydata/redis/redis-node-05:/data redis --cluster-enabled yes --appendonly yes --port 6385
docker run -d --name=redis-node-06 --net host --privileged=true -v /mydata/redis/redis-node-06:/data redis --cluster-enabled yes --appendonly yes --port 6386
```

1. 进入容器：`docker exec -it redis-node-01 /bin/bash`
2. 进入redis后，执行构建集群主从关系命令

- `redis-cli --cluster create 192.168.168.28:6381 192.168.168.28:6382 192.168.168.28:6383 192.168.168.28:6384 192.168.168.28:6385 192.168.168.28:6386 --cluster-replicas 1`

- - --cluster-replicas 1：表示为每个master创建一个slave节点

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653094628528-6622d013-0230-42f4-a785-290fffe15446.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653094775066-f734816c-4802-4254-94af-b1818cd87768.png)

1. 以6381作为切入点，查看集群状态

- `redis-cli -p 6381 `

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653095969277-37f90d1c-b087-4061-8e8b-abc0224a8e5e.png)

### 数据读写存储

1. 集群配置已经完成。但是现在是以`redis-cli -p 6381`命令进入的客户端。此时存入数据超出该容器哈希槽值就会报错。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653097247135-1a4f6069-3862-496d-9b49-17a4ae4b62b8.png)

1. 需要以集群方式连接客户端 `redis-cli -p 6381 -c`。会根据存入数据的哈希槽值自动重定向到对应的集群库中。

- -c：表示cluster集群模式

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653098246108-85bcc198-0e96-417f-871d-ca28f0f29a89.png)![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653098020671-b8605567-6b9d-4757-9274-df84774c8900.png)

1. 查看集群信息状态

- `redis-cli --cluster check 192.168.168.28:6381`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653099030285-4da9a3fd-9873-443d-9c17-c940e5281fad.png)

### 容错切换迁移

1. 停掉redis-node-01 redis6381，看他的从服务器6386是否上位。

- docker stop redis-node-01
- docker exec -it redis-node-02 /bin/bash
- redis-cli -p 6382 -c
- cluster node   查看集群节点信息。原master6381状态变为fail。原slave6386由slave变成master，成功上位。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653100869221-7a91f2a4-afe4-4787-9bca-9ace9e7f9e82.png)

1. 重新激活 redis-node-01 redis6381

- 重新激活原master6381，因为原slave6386成功上位为master，所以就算6381重新激活也只能称为6386的slave。

### 主从扩容

- 原三主三从基础上扩容再增加一主一从

1. 新建并启动主从节点

```properties
docker run -d --name=redis-node-07 --net host --privileged=true -v /mydata/redis/redis-node-07:/data redis --cluster-enabled yes --appendonly yes --port 6387
docker run -d --name=redis-node-08 --net host --privileged=true -v /mydata/redis/redis-node-08:/data redis --cluster-enabled yes --appendonly yes --port 6388
```

1. `docker exec -it redis-node-07 /bin/bash`。进入6387实例内部。
2. 将新增的6387节点（空槽位）作为master节点加入原集群。

- redis-cli --cluster add-node 需要加入集群的ip:port 集群中某节点ip:port
- `redis-cli --cluster add-node 192.168.168.28:6387 192.168.168.28:6381`。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653110190232-73437482-54d8-4340-aba7-28156a5b760b.png)

1. `redis-cli --cluster check 192.168.168.28:6381`。检查集群情况。新节点0槽位0从机。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653110450346-c4cc51ab-1328-48aa-b02a-e3af3177748c.png)

1. `redis-cli --cluster reshard 192.168.168.28:6381`。重新分配集群的哈希槽位

- \1. 指定需要移动的哈希槽位数量。为新节点分配4096 个(共16384/4个节点)。
- \2. 指定为哪个节点分配哈希槽（通过ID指定）
- \3. 输入all为从所有主节点(6381,6382,6383)中分别抽取相应的槽数指定到新节点中，抽取的总槽数为4096个。
- \4. 输入yes确认开始执行分片任务。
- 注意：对应哈希槽内的数据也会随哈希槽变更而随之变动。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653111013366-562fb495-704d-44f2-b5bb-d8eb4bd9d4c6.png)

1. `redis-cli --cluster check 192.168.168.28:6381`。重新检查集群情况。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653111862228-030000f3-9b45-4c5a-be29-df94155a112a.png)

1. 为6387主节点分配从节点6388

- `redis-cli --cluster add-node 192.168.168.28:6388 192.168.168.28:6387 --cluster-slave --cluster-master-id be798b2f7cb0d5c65d495562fb58bccf47d213f8`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653112344545-5a39b592-d44e-4220-94ee-cbd83d223472.png)

1. `redis-cli --cluster check 192.168.168.28:6381`。重新检查集群情况。四个节点一主一从完成。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653112396234-94ed653c-fe3a-4c87-a482-789c84a37ddb.png)

### 主从缩容

- 目的：将6387 和 6388 从集群从去除。达到缩容目的。

1. 先从集群中移除对应主机63887的从机6388 。

- `redis-cli --cluster del-node 192.168.168.28:6388 c4d5e38b5ee2c7da1425fe190f1cf74328e2c0f4`

1. 将6387的哈希槽清空，重新分配这些哈希槽。本例将回收的哈希槽号都给6381。

- `redis-cli --cluster reshard 192.168.168.28:638`。集群哈希槽重新分配：参数只要是集群中的主机就行。

- - \1. 输入需要移动的哈希槽位数量。6387上共有4096个。
  - \2. 输入接收这些哈希槽的节点ID
  - \3. 输入源节点 6387 的ID 。因为要移除6387节点，所以需要将他的哈希槽号分配给其他节点。
  - \4. 输入 done 确认分配。

1. 查看重新分配槽位后的集群情况。已将6387全部哈希槽给了6381了。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653114061959-65f60b91-4451-4103-ba3c-a33f040bacb2.png)

1. 从集群中移除主机63887

- `redis-cli --cluster del-node 192.168.168.28:6387 be798b2f7cb0d5c65d495562fb58bccf47d213f8`

1. 查看缩容后集群检查情况

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653114266498-1f5e5dfa-c5de-430e-9269-25a3d03a7298.png)



## Dockerfile

### 简介

Dockerfile是用来构建Docker镜像的文本文件，是由一条条构建镜像所需的指令和参数构成的脚本。

- 编写Dockerfile -> docker build构建镜像 -> docker run 运行容器实例。

- 使用Dockerfile构建镜像命令：`docker build -f /path/Dockerfile`

### 基础知识

1. 每条保留字指令都必须大写，且后面要跟随至少一个参数。
2. 指令按照从上至下，顺序执行。
3. 用#表示单行注释。
4. 每条指令都会创建一个新的镜像层并对镜像进行提交。



### Dockerfile常用命令

- set -eux 也就是 以调试的方式执行shell ，只识别定义过的变量，同时脚本传回值非0 直接结束shell

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653137093253-aa368ec6-1b83-489f-b0a9-724508b13602.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653137105615-62dd16fe-b447-4477-a5da-15fc7463bd1d.png)

#### FROM

- 指定一个已经存在的镜像作为基础镜像，必须为第一个命令
- `FROM…AS…`Docker 17.05及以上版本新指令，给这个阶段的镜像起个别名。
- 示例： FROM mysql:5.6

#### RUN

- 构建容器时执行的命令。两种格式，推荐shell格式。

- - shell格式：RUN <command>
  - exec格式：RUN ["executable", "param1", "param2"]

- 每多一行RUN都会给镜像增加一层。尽量通过&&将所有命令联结在一起执行以减少层数。

- - 如：RUN set -ex && mkdir -p /root/logs

- 示例：RUN apt -y install vim。

#### CMD

- 置容器的启动命令。构建镜像后调用，也就是在容器启动时才进行调用。格式同RUN命令
- 注：Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换
- 格式：

- - CMD ["executable", "param1", "param2"] （执行可执行文件，优选）
  - CMD ["param1", "param2"] （设置了ENTRYPOINT，则将内容作为参数传递给ENTRYPOINT）
  - CMD command param1 param2 （执行shell内部命令）

- 示例：CMD ["catalina.sh", "run"]
- CMD echo"----hello----"

#### LABEL

- 用于为镜像添加镜像标签元数据。
- 注：使用LABEL指定元数据时，一条LABEL指定可以指定一或多条元数据，指定多条元数据时不同元数据之间通过空格分隔。推荐将所有的元数据通过一条LABEL指令指定，以免生成过多的中间镜像。
- 示例：LABEL version="1.0" description="测试一下" by="刘杨"

#### MAINTAINER（过时）

- 维护者信息，如：姓名、邮箱等
- 示例：MAINTAINER 刘杨

#### EXPOSE

- 指定容器对外交互暴露的端口。
- 示例：EXPOSE 80 443。  EXPOSE 11211/tcp 11211/udp。

#### ENV

- ·在构建镜像过程中设置环境变量(常量)。会持久化到构建好的镜像中。
- 格式：ENV <key> <value>或 ENV <key>=<value>
- 通过`${变量名}`或者 `$变量名` 使用变量
- 示例：ENV JAVA_HOME /usr/local/java

- - WORKDIR  $JAVA_HOME 

#### ADD

- ·将宿主机目录下的文件拷贝进镜像且会自动处理URL和解压tar压缩包.
- 示例：ADD hom* /mydir/     # 添加所有以"hom"开头的文件

#### COPY

- 功能类似ADD，但是是不会自动解压文件，也不能访问网络资源

#### ENTRYPOINT

- 设置容器的入口程序。容器启动时执行的程序。
- 类似于 CMD 指令，但是ENTRYPOINT不会被docker run后面的命令覆盖。
- 当指定了ENTRYPOINT后，CMD的含义就发生了变化，不再是直接运行其命令而是将CMD的内容作为参数传递给ENTRYPOINT指令。
- 格式：

- - \1. ENTRYPOINT ["executable", "param1", "param2"] (可执行文件, 优先)
  - \2. ENTRYPOINT command param1 param2 (shell内部命令)

- 注：如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

```powershell
FROM nginx
ENTRYPOINT ["nginx", "-c"]    # 定参。指定配置文件启动nginx
CMD ["/etc/nginx/nginx.conf"] # 变参。配置文件路径，传递给ENTRYPOINT

默认执行： docker run nginx:test 
衍生命令：nginx -c /etc/nginx/nginx.conf

# 当指定了ENTRYPOINT后，CMD不再直接运行其命令，而是将CMD的内容作为参数传递给ENTRYPOINT指令。
带参数运行：docker run nginx:text -c /etc/nginx/custom.conf   # 携带参数：-c /etc/nginx/custom.conf
衍生命令: nginx -c /etc/nginx/custom.conf
```

#### VOLUME

- 容器数据卷，用于指定持久化目录（指定此目录可以被挂载出去）
- 示例：VOLUME ["/var/www", "/var/log/apache2", "/etc/apache2"]

#### USER

- 指定该镜像运行用户。不指定默认root。
- 示例：USER liuyang:rootGroup

#### WORKDIR

- 设置RUN、CMD、ENTRYPOINT、ADD、COPY指令的工作目录。相当于cd命令。如果工作目录不存在，则Docker Daemon会自动创建。
- 示例：WORKDIR /usr/local

#### ARG

- 用于指定传递给构建运行时的变量(给dockerfile传参)，相当于构建镜像时可以在外部为里面传参。
- 使用 docker build --build-arg 标志在命令行上对其进行赋值。
- 格式：ARG <name>[=<default value>]
- 示例：  

- - ARG parameter
  - RUN yum -y install $parameter
  - docker build --build-arg=parameter=net-tools -t nginx

```shell
FROM ubuntu
MAINTAINER 刘杨<18266643599@163.com>

ENV MYPATH /usr/locat
WORKDIR $MYPATH

RUN apt -y install vim
RUN apt -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo"----end----"
CMD /bin/bash  
```

#### CMD、ENTRYPOINT、RUN的区别

- RUN指令是设置编译镜像时执行的脚本和程序，镜像编译完成后，RUN指令的生命周期结束。
- 容器启动时，可以通过CMD和ENTRYPOINT设置启动项，其中CMD叫做容器默认启动命令，如果在docker run命令末尾添加command，则会替换镜像中CMD设置的启动程序，不添加则使用默认启动命令。
- ENRTYPOINT叫做入口程序，不能被docker run命令末尾的command替换，而是将command当作字符串，传递给ENTRYPOINT作为参数。

```shell
FROM ubuntu
ENTRYPOINT ["ps"]
CMD ["-ef"]
//通过命令docker run --rm test启动容器，打印 ps -ef 的输出
```

### 构建Nginx镜像Dockerfile示例

```shell
[root@localhost opt]# mkdir nginx   ##创建Nginx目录
[root@localhost opt]# cd nginx/
[root@localhost nginx]# vim Dockerfile
FROM centos:7
MAINTAINER The is nginx <zjz>
RUN yum install -y proc-devel gcc gcc-c++ zlib zlib-devel make openssl-devel wget
ADD nginx-1.14.0.tar.gz /usr/local
WORKDIR /usr/local/nginx-1.14.0/
RUN ./configure --prefix=/usr/local/nginx && make && make install
EXPOSE 80
EXPOSE 443
RUN echo "daemon off;">>/usr/local/nginx/conf/nginx.conf
WORKDIR /root/nginx
ADD run.sh /run.sh
RUN chmod 755 /run.sh
CMD ["/run.sh"]

[root@localhost nginx]# vim run.sh
#!/bin/bash
/usr/local/nginx/sbin/nginx   ##开启Nginx服务

[root@localhost nginx]# rz    ##在xshell里上传nginx安装包

[root@localhost nginx]# ls
nginx-1.14.0.tar.gz
[root@localhost nginx]# docker build -t nginx:new .   ##创建镜像
[root@localhost nginx]# docker run -d -P nginx:new    ##创建容器
ba75ff06051430938bbb014450cd16f7b2b7a2fe023969a6a0ec76051d6872c5
[root@localhost nginx]# docker ps -a   ##查看容器
```

#### 

## 构建jdk8镜像示例

1. `mkdir /home/myfile && cd /home/myfile`。
2. 将jdk8上传到myfile目录。
3. `vim Dockerfile`。创建并编辑Dockerfile文件。

```shell
FROM ubuntu
MAINTAINER 刘杨 测试一下

ENV MYPATH /usr/local
WORKDIR $MYPATH

## 安装vim 编辑器
RUN apt update && apt install vim -y && apt install net-tools -y
RUN mkdir /usr/local/java

## 使用ADD把JDK8添加到容器中(ADD会自动解压缩)。注意：ADD是相对路径，JDK8安装包与Dockerfile文件必须在同一位置。
ADD jdk-8u333-linux-x64.tar.gz /usr/local/java/

## 配置java环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_333
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH .:${JAVA_HOME}/lib:${JRE_HOME}/lib
ENV PATH ${JAVA_HOME}/bin:$PATH

EXPOSE 80

CMD echo $MYPATH
CMD echo "success---------------------------------------ok"
CMD /bin/bash
```

1. 构建镜像：docker build -t 新镜像名称:TAG .

- 注意：TAG后面有个空格和一个点.
- `docker build -t myjava8:1.0 .`

1. `docker images`。查看构建好的镜像。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653197242308-3f941a0e-12fe-402c-a78d-2cfad80af69a.png)

1. `docker  run -it myjava8:1.0 /bin/bash`。启动镜像测试一下。

- 测试Dockerfile 配置安装的 vim、net-tools、java8 是否正常

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653197528742-5baca7f5-e08a-42f0-965d-72f868fe51cc.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653197702793-a400c3c7-4a47-4e2e-bb74-6f874fcfa67e.png)



## Docker微服务实战

- 将服务打成jar包
- 编写Dockerfile文件

```shell
## 基础镜像使用 java8
FROM java:8
## 作者
MAINTAINER liuyang
## 指定临时文件目录/tmp。在主机/var/lib/docker目录下创建了一个临时文件并链接到容器的/tmp
VOLUME /tmp
## 将jar包添加到容器中，并重命名 
ADD docker_boot-0.0.1-SNAPSHOT.jar docker_boot.jar
## 运行jar包
RUN bash -c 'touch /docker_boot.jar'
ENTRYPOINT ["java", "-jar", "/docker_boot.jar"]
## 暴露端口
EXPOSE 8081
```

- 构建镜像：`docker build -t docker_boot:1.0 .`
- 运行容器：`docker run -d -p 8081:8081 docker_boot:1.0`
- 访问测试：访问服务接口



## Docker Network

### 常用命令

- `docker network ls`。查看网络。
- `docker network inspect 网络名称`。查看网络源数据。
- `docker network create 网络名称`。创建网络，默认为网桥模式。
- `docker network rm 网络名称`。删除网络。

### 网络情况

1. 未开docker时默认网络。

1. 1. ens33：主机网络
   2. lo：本地环回。都是127.0.0.1

1. docker启动后网络情况。

1. 1. 会产生一个docker0的虚拟网络

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653223662807-cebd0704-ade4-45fd-a4d2-11e735bb54b2.png)



### Docker 网络

#### 作用

作用：1.容器间的互联和通讯以及端口映射。 2.容器重启等IP变动的时候可以通过服务名直接网络通讯而不受影响。

- `docker network ls`。查看docker网络情况。默认创建3大网络模式（共5种，另外为容器模式、自定义模式）。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653223911035-7e7c78ad-3fb9-44f7-9710-c24d7e550de9.png)

#### 案例：

- `docker run -d -p 8081:8080 --name=tomcat81 billygoo/tomcat8-jdk8`
- `docker run -d -p 8082:8080 --name=tomcat82 billygoo/tomcat8-jdk8`
- `docker exec -it tomcat81 bash`
- `docker exec -it tomcat82 bash`

#### 网络模式

- bridge：为每一个容器分配、设置IP等，并将容器连接到一个docker0。虚拟网络，默认为该模式。

- - 使用 `--network bridge` 指定，默认使用docker0。

- host：容器不会虚拟出自己的网络。而是使用宿主机的IP和端口。

- - 使用 `--network host` 指定。

- none：容器有独立的Network namespace，但并没有对其进行任何网络配置。

- - 使用 `--network none` 指定。

- container：新创建的容器不会创建自己的网卡和配置，而是和一个指定的容器共享ip、point等

- - `使用--network container:名称或者ID指定`。



#### Bridge模式（默认，常用）

docker服务默认会创建一个docker0网桥。它在内核层连通了其他的物理或虚拟网卡，这就将所有容器和本地主机都放到同一个物理网络。

docker默认指定了docker0接口的IP地址和子网掩码，让主机和容器之间可以通过网桥相互通信。

- 查看bridge网络信息：docker network inspect bridge | grep name

**说明：**

1. 整个宿主机的网桥模式都是docker0，类似一个交换机有一堆接口，每个接口叫veth，在本地主机和容器内分别创建一个虚拟接口，并让他们彼此联通（这样一对接口叫veth pair）。
2. 每个容器实例内部也有一块网卡，每个接口叫eth0。
3. docker0上面的每个veth匹配某个容器实例内部的eth0，两两配对，一一匹配。

- 通过上述，将宿主机上的所有容器都连接到这个内部网络上，两个容器在同一个网络下，会从这个网关下各自拿到分配的ip，此时两个容器的网络是互通的。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653281564768-3c6b1e59-fbac-4cf8-8091-417aff429ebc.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653369290768-86f56678-488c-496e-972c-464667ddfdfb.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653368606722-b64777a0-4d8b-42c8-ae55-8a40fb0eb13d.png)

#### Host 模式

**说明：**容器将不会获得一个独立的Network Namespace，而是和宿主机公用一个Network Namespace。容器将不会虚拟出自己的网卡，而是使用宿主机IP和端口。

**注意：**

问题：docker启动时总是提示警告。`WARNING: Published ports are discarded when using host network mode`

原因：docker启动时指定--network=host或-net=host，并且还指定了-p端口映射，就会出现次警告。并且-p的设置不会起到作用，端口号会以主机端口号为主，重复时则递增。

解决：使用其他网络模式，如--network=bridge。或者不理会警告。

访问：以Tomact为例，此模式没有端口映射，Tomcat容器默认8080端口，则就直接访问主机8080端口。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653282627273-e7f39d58-bd88-48fe-9527-b7db072cc5df.png)

#### none模式（了解）

**说明：**禁用了网络功能，只有lo标识（就是127.0.0.1 本地回环）。不为docker容器进行任何网络配置。需要自己为docker容器添加网卡、配置IP等。

#### container

**说明：**新建的容器和已经存在的一个容器共享一个网络ip配置。新创建的容器不会创建自己的网卡、不配置ip，而是和一个指定的容器共享ip、端口范围等。 

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653284107096-cd3dd53f-f351-408d-bc48-429f1e430433.png)

**测试：**两个Tomcat公用一个ip和端口导致端口冲突，本案例不适合用Tomcat演示。可以使用`alpine`镜像（使用 `/bin/sh`）。`alpine`是一个面向安全的轻型Linux发行版系统，不到6M大小，适合基础镜像容器打包。

- `docker run -it --name=alpine1 alpine /bin/sh`
- `docker run -it --network container:alpine1 --name=alpine2 alpine /bin/sh`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653369538649-c21b2fad-782b-4d66-8394-578ca6ef84cb.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653369584196-7c86f2fc-b187-4e43-b1e5-400099c0d7c7.png)

#### 自定义网络

- 自定义桥接网络，默认使用的是桥接网络bridge。
- 自定义网络本身维护好了主机名和IP的对应关系（使用IP和服务名都能通）

实际使用中：docker容器的IP不是固定的。启动顺序、重启都会影响IP分配。IP是动态变动的，服务名可以固定。

bridge模式中，容器使用IP可以互相ping通。但是用服务名就会不通，提示名称或服务未知。

所以容器间最好不要使用IP而是使用服务名称通讯。

所以需要自定义网络，这样就支持荣期间通过服务名通讯了。

1. `docker network create custom_ly`。创建自定义网络。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653370544824-9028cb15-2c7e-4439-851d-822772e29a5c.png)

1. 启动容器，指定使用自定义网络。

- `docker run -d -p 8081:8080 --network custom_ly --name=tomcat81 billygoo/tomcat8-jdk8`
- `docker run -d -p 8082:8080 --network custom_ly --name=tomcat82 billygoo/tomcat8-jdk8`
- `docker exec -it tomcat81 bash`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653371262554-f62837b8-355c-4fce-9109-399750db9bea.png)



## 容器编排compose

### 简介

- Compose 是 Docker 公司推出的一个工具软件，可以管理多个Docker容器组成一个应用。需要定义一个YAML格式的配置文件`docker-compose.yml`，写这些容器之间的调用关系。然后只需要一个命令，就能同时启动/关闭这些容器。

因为docker容器本身占用资源极少，docker建议每个容器中只运行一个服务。

如果需要同时部署好多个服务，每个服务都单独写Dockerfile然后在构建镜像，这样很不方便。所以docker官方提供了docker-compose多服务部署的工具。

Compose允许用户通过一个单独的docker-compose.yml模板文件来定义一组相关联的应用容器为一个项目。可以很容易 地用一个配置文件定义一个多容器应用，然后使用一条指令安装这个应用所有依赖，完成构建。

Docker-Compose解决了容器与容器之间如何管理编排的问题。

### 安装docker-compose

- 参考官方文档教程：https://docs.docker.com/compose/install/

```shell
apt-get update
apt-get install docker-compose-plugin
apt-get install docker-compose
docker compose version
```



### 常用命令

```shell
docker-compose -h										# 查看帮助
docker-compose up										# 启动所有docker-compose服务
docker-compose up -d								# 启动所有docker-compose服务并后台运行
docker-compose down									# 停止并删除容器、网络、卷、镜像
docker-compose exec yml里面的服务ID	# 进入容器实例内部 docker-compose exec docker-compose.yml文件中的服务ID /bin/bash
docker-compose ps										# 展示当前docker-compose编排过的运行的所有容器
docker-compose top									# 展示当前docker-compose编排过的容器进程

docker-compose logs	yml里面的服务ID	# 查看容器输出日志 
docker-compose config								# 检查配置
docker-compose config -q						# 检查配置，有问题才有输出
docker-compose restart							# 重启服务
docker-compose start								# 启动服务
docker-compose stop									# 停止服务
```



### Compose编排微服务

参考 : Docker微服务实战 。完善docker_boot.jar 改造升级重新构建镜像

#### 不用compose编排服务

- 运行`docker_boot.jar`服务需要`Redis`和`MySQL`支撑。所以需要提前运行这两个镜像。
- 由此可见想要部署这个服务，需要run三次。并初始化相关环境，如建库建表。
- 弊端：1. 编排时需要注意启动顺序。2. 服务异常重启IP地址对应的容器变化，映射出错。

#### 使用compose编排服务

##### 1. 编写docker-compose.yml文件

```yaml
version: "3"

services: 
  ## 等同于 docker run -d -p 8081:8081 -v /home/microService:/data --network liuyang_net --name=ms01 docker_boot:2.0
  microService: 
    image: docker_boot.jar:3.0
    # 容器名称。
    ## 有container_name则用container_name指定的名称代替。
    ## 没有container_name会根据 当前路径+服务名称+序号 生成名称
    container_name: ms01
    ports:
      - "8081:8081"
    volumes:
      - /home/microService:/data
    networks:
      - liuyang_net
    depends_on:
      - redis
      - mysql
      
  redis:
    image: redis
    ports:
      - "6379:6379"
    volumes:
      - /home/redis/redis.conf:/etc/redis/redis.conf
      - /home/redis/data:/data
    networks:
      - liuyang_net
    # 运行命令。指定配置文件启动redis
    command: redis-server /etc/redis/redis.conf
    
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: 'root'
      MYSQL_ALLOW_EMPTY_PASSWORD: 'no'
      MYSQL_DATABASE: 'liuyang01'
      # 新建个用户
      MYSQL_USER: 'liuyang'
      MYSQL_PASSWORD: 'root'
    ports:
      - "3306:3306"
    volumes:
      - /home/mysql/data:/var/lib/mysql
      - /home/mysql/conf/my.cnf:/etc/my.cnf
      - /home/mysql/log:/var/log/mysql
      - /home/mysql/init:/docker-entrypoint-initdb.d
    networks:
      - liuyang_net
    # 解决外部无法访问
    command: --default-authentication-plugin=mysql_native_password 

# 创建自定义docker网络
networks:
  liuyang_net:
    
```

##### 2. 再次修改微服务配置

- 修改yml配置文件。固定写死的IP改为服务。 使服务由通过IP通讯改为通过服务名称通讯。与ip无关。
- 重新打包服务。重新构建镜像。

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653975637497-f002b15e-92d0-405a-851a-7cadbfd9d45d.png)

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653975577248-7ff94985-8a36-4811-b8bd-73e0492e5360.png)

##### 3. 检查脚本配置是否正确

- `docker-compose config -q`
- 没有输出任务信息表示没有问题

##### 4. 后台运行docker-compose

- `docker-compose up -d`

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653977809392-133ae607-d09a-4993-80bf-914ed00a319a.png)

##### 5. 检查服务启动情况

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653977905403-1133b2fc-93e7-4fe4-bc1f-af0c09b46ef8.png)

1. 进入MySQL。查看是否创建数据库。

- docker exec -it docker_boot_mysql_1 bash
- mysql -u root -p
- show databases;
- use liuyang01;   show tables;

```sql
create table `t_user`(
    `id` int(10) unsigned not null auto_increment,
    `username` varchar(50) not null default '' comment '用户名',
    `password` varchar(50) not null default '' comment '密码',
    `sex` tinyint(4) not null default '0' comment '性别0女1男',
    `deleted` tinyint(4) unsigned not null default  '0' comment '删除标志0不删除1删除',
    `update_time` timestamp not null default current_timestamp on update current_timestamp  comment '更新时间',
    `create_time` timestamp not null default current_timestamp comment '创建时间',
    primary  key(`id`)
)engine=innodb auto_increment=1 default charset=utf8 comment='用户表'
```

1. 进入redis。查看keys情况。

- docker exec -it docker_boot_redis_1 bash
- redis-cli
- keys *

1. 访问服务接口。测试读写数据。

- 查看接口情况：http://192.168.168.28:8081/swagger-ui/
- 使用swagger测试接接口插入数据。
- 查看MySQL数据库、redis是否有新值

![img](https://cdn.nlark.com/yuque/0/2022/png/28115346/1653979596251-ac30a3a4-155c-487c-83a3-c8c2c6cd3f46.png)









# 底部
