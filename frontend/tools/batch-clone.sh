#!/bin/bash
BOSHOME=`pwd`
echo "+++++++++++ BOSHOME=$BOSHOME"

GitRepo="http://192.168.102.21:8001"

git_work=( \
"java-new/atd/aa/test" \
)

showHelp(){
    echo "Use: ./clone.sh DEV";
}

for i in "${git_work[@]}"; do
    echo --------- git clone -b master $GitRepo$i.git
    cd $BOSHOME
    echo "+++++++++++++ local dir is `pwd`"
    git clone -b master $GitRepo.git
    gb=`echo ${i} | cut -f5 -d "/"`
    if [ ! $gd ]; then
        gd=`echo ${i} | cut -f4 -d "/"`
    fi
    if [ ! $gd ]; then
        gd=`echo ${i} | cut -f3 -d "/"`
    fi
    if [ ! $gd ]; then
        gd=`echo ${i} | cut -f2 -d "/"`
    fi
    echo $gd
    cd $gd
    git checkout -b $1 origin/$1
    cd ../
    echo -------- done.
    echo
done

echo ------------------------- Finished.