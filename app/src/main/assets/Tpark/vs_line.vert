uniform   mat4 g_matProj;											
attribute vec4 g_vPosition;		
attribute vec4 g_vColor;									
varying   vec4 g_vVSColor;	
							
void main()					
{						
    	g_vVSColor = g_vColor;	
    	gl_Position  = g_matProj * g_vPosition;	
}	
