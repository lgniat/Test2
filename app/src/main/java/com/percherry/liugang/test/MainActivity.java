package com.percherry.liugang.test;

import android.app.Activity;
import android.os.Environment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }
    public byte[] test;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        long aa[][];
        long b;


        //if()
            //test=new byte[3];

        test = new byte[3];

        test[0]=10;
        test[1]=20;
        test[2]=30;
        //if(test == null)
            //Log.d("test", "------------------test2"+test[0]+test[1]+test[2]+test[3]);
        // Example of a call to a native method
        TextView tv = (TextView) findViewById(R.id.sample_text);
        tv.setText(stringFromJNI());
        Log.d("test", "------------------onCreate1");
        aa = getArray();
        b = aa[0][0];

        String test = this.getFilesDir().getAbsolutePath() ;

        File file = new File(Environment.getExternalStorageDirectory()+File.separator+"GIFT");
//判断文件夹是否存在,如果不存在则拷贝
        //if (!file.exists()) {
            copyAssetsDir2Phone(this, "GIFT");
            copyAssetsDir2Phone(this, "Tpark");
        //}
        Log.d("test", "------------------onCreate"+b);

    }


    @Override
    protected void onResume()
    {
        super.onResume();
    }

    /**
     *  从assets目录中复制整个文件夹内容,考贝到 /data/data/包名/files/目录中
     *  @param  activity  activity 使用CopyFiles类的Activity
     *  @param  filePath  String  文件路径,如：/assets/
     */
    public static void copyAssetsDir2Phone(Activity activity, String filePath){
        try {
            String[] fileList = activity.getAssets().list(filePath);
            if(fileList.length>0) {//如果是目录
                File file=new File(activity.getFilesDir().getAbsolutePath()+ File.separator+filePath);
                //File file=new File(Environment.getExternalStorageDirectory()+ File.separator+filePath);

                file.mkdirs();//如果文件夹不存在，则递归
                for (String fileName:fileList){
                    filePath=filePath+File.separator+fileName;

                    copyAssetsDir2Phone(activity,filePath);

                    filePath=filePath.substring(0,filePath.lastIndexOf(File.separator));
                    Log.e("oldPath",filePath);
                }
            } else {//如果是文件
                InputStream inputStream=activity.getAssets().open(filePath);
                File file=new File(activity.getFilesDir().getAbsolutePath()+ File.separator+filePath);
                //File file=new File(Environment.getExternalStorageDirectory()+ File.separator+filePath);

                Log.i("copyAssets2Phone","file:"+file);
                if(!file.exists() || file.length()==0) {
                    FileOutputStream fos=new FileOutputStream(file);
                    int len=-1;
                    byte[] buffer=new byte[1024];
                    while ((len=inputStream.read(buffer))!=-1){
                        fos.write(buffer,0,len);
                    }
                    fos.flush();
                    inputStream.close();
                    fos.close();
                    //showToast(activity,"模型文件复制完毕");
                } else {
                    //showToast(activity,"模型文件已存在，无需复制");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 重写onKeyDown方法可以拦截系统默认的处理
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // TODO Auto-generated method stub
        Log.d("test", "------------------onKeyDown");
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            Toast.makeText(this, "后退键", Toast.LENGTH_SHORT).show();
            return true;
        } else if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            Toast.makeText(this, "hh+", Toast.LENGTH_SHORT).show();
            //moveTaskToBack(true);
            return false;
        } else if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            Toast.makeText(this, "xx-", Toast.LENGTH_SHORT).show();
            return false;
        } else if (keyCode == KeyEvent.KEYCODE_VOLUME_MUTE) {
            Toast.makeText(this, "静音", Toast.LENGTH_SHORT).show();
            return false;
        } else if (keyCode == KeyEvent.KEYCODE_HOME) {
            Toast.makeText(this, "Home", Toast.LENGTH_SHORT).show();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

    /**
     * 重写onTouchEvent方法可以处理Touch事件
     */
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        // TODO Auto-generated method stub
        if (event.getAction() == MotionEvent.ACTION_MOVE) {
            Toast.makeText(this, "ACTION_MOVE", Toast.LENGTH_SHORT).show();
        } else if (event.getAction() == MotionEvent.ACTION_UP) {
            Toast.makeText(this, "ACTION_MOVE", Toast.LENGTH_SHORT).show();
        } else if (event.getAction() == MotionEvent.ACTION_DOWN) {
            Toast.makeText(this, "ACTION_MOVE", Toast.LENGTH_SHORT).show();
        }
        Log.d("test", "------------------onTouchEvent");
        return super.onTouchEvent(event);
    }

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public native String stringFromJNI();
    public native long[][] getArray();

}
