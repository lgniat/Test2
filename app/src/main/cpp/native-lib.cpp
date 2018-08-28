#include <jni.h>
#include <string>

extern "C" {

//add by liugang,20180823
static char gRootPath[128];
static char gWholePath[128];

int SetAssetsPath(char *pRootPath) {

#if 0
    if(pPath != NULL)
    {
        int i;
        for(i=0;(*pPath) != '\0';i++,pPath++)
        {
            gPath[i] = *pPath;
        }
        gPath[i]='\0';
        return 1;

    }else
        return 0;
#endif

    strcpy(gRootPath, pRootPath);
    return 0;
}


char *GetAssetsPath(char *pRelativePath) {

    memset(gWholePath, 0, 128);
    strcpy(gWholePath, gRootPath);
    strcat(gWholePath, pRelativePath);

    char *p[] ={"test1","test2","test3"};
    char p_test[3][128];
    strcpy(p_test[0],p[0]);
    strcpy(p_test[1],p[1]);
    strcpy(p_test[2],p[2]);

    return gWholePath;
}


JNIEXPORT jstring

JNICALL
Java_com_percherry_liugang_test_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}


 JNIEXPORT jobjectArray

JNICALL
Java_com_percherry_liugang_test_MainActivity_getArray(
        JNIEnv *env,
        jobject /* this */) {


    //一维数组
    jclass intArrCls = env->FindClass("[J");
    //创建一个有10个元素，每个元素的值是  一维数组的数组
    jobjectArray second = env->NewObjectArray(32, intArrCls, NULL);

    //给以维数据填充值
    for (int i = 0; i < 32; i++) {

        jlong tmp[256]; /* make sure it is large enough! */

        jlongArray iarr = env->NewLongArray(2);

        tmp[0] = 10001;
        tmp[1] = 10002;

        //把temp里的0-3的数据值设置给iarr里
        env->SetLongArrayRegion(iarr, 0, 2, tmp);
        //给一维数组的第i个元素设置值
        env->SetObjectArrayElement(second, i, iarr);
        //删除临时元素iarr数组
        env->DeleteLocalRef(iarr);

    }

    char *pPath;
    SetAssetsPath("/rootpath/");
     pPath = GetAssetsPath("path1");
    return second;



}




}

