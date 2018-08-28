precision mediump float;
uniform   mat4 g_matProj;											
attribute vec4 g_vPosition;		
attribute vec2 g_vTexCoord;									
varying   vec2 g_vVSTexCoord;	
							
void main()					
{							
    	gl_Position  = g_matProj * g_vPosition;	
    	g_vVSTexCoord = g_vTexCoord;
}	
