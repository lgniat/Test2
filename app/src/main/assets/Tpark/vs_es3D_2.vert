precision mediump float;
uniform   mat4 g_matModelView;		
uniform   mat4 g_matProj;				
							
attribute vec4 g_vPosition;		
attribute vec2 g_vTexCoord1;
attribute vec2 g_vTexCoord2;			
							
varying   vec2 g_vVSTexCoord1;
varying   vec2 g_vVSTexCoord2;	
varying   vec2 g_vVSPosition;		
							
void main()					
{							
    	vec4 vPositionES = g_matModelView * g_vPosition;
    	gl_Position  = g_matProj * vPositionES;	
    	g_vVSTexCoord1 = g_vTexCoord1;
    	g_vVSTexCoord2 = g_vTexCoord2;
    	g_vVSPosition.xy = g_vPosition.xy;
}	
