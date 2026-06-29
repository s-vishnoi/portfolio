"""
TouchDesigner builder for the Vision & Sound background.

How to use:
1. Open TouchDesigner.
2. Open a new blank project.
3. Add a Text DAT, paste this entire file into it.
4. Right-click the Text DAT and choose "Run Script".
5. Save the project as vision_sound_bg.toe.

The script creates /project1/vision_sound_bg with a GLSL TOP based generative
background, a Null TOP preview/output, and a Movie File Out TOP for export.
"""

PROJECT_NAME = "vision_sound_bg"
SOURCE_MOVIE = "/Users/vishnoi/Desktop/PORTFOLIO/site/videos/birds_track.mov"
OUTPUT_MOVIE = "vision_sound_bg.mp4"


FRAG_SHADER = r"""
// Vision & Sound generative background
// TouchDesigner GLSL TOP pixel shader

out vec4 fragColor;

uniform vec2 uTDOutputInfo_res;
uniform float uTime;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 r = mat2(0.86, -0.5, 0.5, 0.86);
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = r * p * 2.04 + 13.1;
        a *= 0.52;
    }
    return v;
}

float bird(vec2 uv, vec2 pos, float scale, float angle) {
    vec2 p = uv - pos;
    float s = sin(angle);
    float c = cos(angle);
    p = mat2(c, -s, s, c) * p;
    p /= scale;

    float wingA = smoothstep(0.032, 0.0, abs(p.y - 0.55 * abs(p.x) + 0.012));
    float wingB = smoothstep(0.026, 0.0, abs(p.y + 0.34 * abs(p.x) - 0.012));
    float span = smoothstep(0.62, 0.02, abs(p.x));
    float body = smoothstep(0.05, 0.0, length(p * vec2(1.9, 4.2)));
    return max(max(wingA, wingB) * span, body);
}

void main() {
    vec2 res = uTDOutputInfo_res;
    vec2 uv = gl_FragCoord.xy / res.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= res.x / res.y;

    float t = uTime * 0.06;

    vec2 flow = vec2(
        fbm(p * 1.1 + vec2(t * 1.7, -t)),
        fbm(p * 1.1 + vec2(-t, t * 1.4))
    );
    vec2 warped = p + (flow - 0.5) * 0.72;

    float mist = fbm(warped * 2.2 + t * 3.0);
    float veins = fbm(warped * 5.4 - t * 2.0);
    float field = smoothstep(0.42, 0.86, mist * 0.72 + veins * 0.34);

    float flock = 0.0;
    for (int i = 0; i < 28; i++) {
        float fi = float(i);
        vec2 seed = vec2(fi * 13.17, fi * 7.31);
        vec2 base = vec2(hash(seed), hash(seed + 4.7));
        vec2 drift = vec2(
            sin(t * 5.4 + fi * 0.47),
            cos(t * 4.1 + fi * 0.31)
        ) * 0.08;
        vec2 pos = (base * 2.0 - 1.0) + drift;
        pos.x *= res.x / res.y;
        pos += vec2(sin(t * 2.0 + fi) * 0.16, cos(t * 1.8 + fi) * 0.08);
        float angle = sin(t * 8.0 + fi * 0.7) * 0.5 + 0.45;
        float scale = mix(0.035, 0.07, hash(seed + 9.2));
        flock += bird(p, pos, scale, angle);
    }
    flock = smoothstep(0.1, 0.85, flock);

    vec3 black = vec3(0.02, 0.018, 0.022);
    vec3 magenta = vec3(1.0, 0.12, 0.34);
    vec3 violet = vec3(0.34, 0.02, 0.92);
    vec3 acid = vec3(0.82, 0.94, 0.04);

    vec3 color = black;
    color += mix(violet, magenta, mist) * field * 0.28;
    color += acid * pow(veins, 5.0) * 0.16;
    color += vec3(1.0, 0.88, 0.92) * flock * 0.86;

    float vignette = smoothstep(1.4, 0.18, length(p));
    color *= vignette;
    color += hash(gl_FragCoord.xy + uTime) * 0.025;

    fragColor = vec4(color, 1.0);
}
"""


def set_par(op_obj, names, value):
    """Set the first parameter name that exists on an operator."""
    if isinstance(names, str):
        names = [names]
    for name in names:
        par = getattr(op_obj.par, name, None)
        if par is not None:
            try:
                par.val = value
                return True
            except Exception:
                pass
    return False


def connect(dst, index, src):
    try:
        dst.setInput(index, src)
    except Exception:
        dst.inputConnectors[index].connect(src)


def make_op(parent_op, op_type, name, node_x=0, node_y=0):
    existing = parent_op.op(name)
    if existing:
        existing.destroy()
    node = parent_op.create(op_type, name)
    node.nodeX = node_x
    node.nodeY = node_y
    return node


def build():
    root = op("/project1")
    if root is None:
        root = ui.panes.current.owner

    existing = root.op(PROJECT_NAME)
    if existing:
        existing.destroy()

    comp = root.create(baseCOMP, PROJECT_NAME)
    comp.nodeX = 0
    comp.nodeY = 0
    set_par(comp, ["w", "panelw"], 900)
    set_par(comp, ["h", "panelh"], 560)

    movie_in = make_op(comp, moviefileinTOP, "SOURCE_birds_track", -650, 290)
    set_par(movie_in, ["file"], SOURCE_MOVIE)
    set_par(movie_in, ["play"], True)
    set_par(movie_in, ["loop"], True)
    set_par(movie_in, ["reload"], True)

    source_level = make_op(comp, levelTOP, "footage_tone", -390, 290)
    connect(source_level, 0, movie_in)
    set_par(source_level, ["blacklevel"], 0.025)
    set_par(source_level, ["brightness1", "brightness"], 0.82)
    set_par(source_level, ["gamma1", "gamma"], 0.78)

    shader_dat = make_op(comp, textDAT, "vision_sound_frag", -650, 90)
    shader_dat.text = FRAG_SHADER

    glsl = make_op(comp, glslTOP, "generative_flock_field", -380, 90)
    set_par(glsl, ["resolutionw", "resw"], 1920)
    set_par(glsl, ["resolutionh", "resh"], 1080)
    set_par(glsl, ["outputresolution"], "custom")
    set_par(glsl, ["pixeldat", "pixelshader", "fragmentdat"], shader_dat)

    level = make_op(comp, levelTOP, "generative_tone", -120, 90)
    connect(level, 0, glsl)
    set_par(level, ["blacklevel"], 0.02)
    set_par(level, ["brightness1", "brightness"], 0.92)
    set_par(level, ["gamma1", "gamma"], 0.88)

    blur = make_op(comp, blurTOP, "soft_bloom", 110, 90)
    connect(blur, 0, level)
    set_par(blur, ["sizex", "size"], 1.15)
    set_par(blur, ["sizey"], 1.15)

    compo = make_op(comp, compositeTOP, "generative_bloom_mix", 340, 90)
    connect(compo, 0, level)
    connect(compo, 1, blur)
    set_par(compo, ["operand"], "screen")

    final = make_op(comp, compositeTOP, "footage_plus_generative", 590, 220)
    connect(final, 0, source_level)
    connect(final, 1, compo)
    set_par(final, ["operand"], "screen")

    out_null = make_op(comp, nullTOP, "OUT_vision_sound_bg", 840, 220)
    connect(out_null, 0, final)
    out_null.viewer = True
    out_null.display = True

    movie = make_op(comp, moviefileoutTOP, "EXPORT_movie_file_out", 840, 30)
    connect(movie, 0, out_null)
    set_par(movie, ["file"], OUTPUT_MOVIE)
    set_par(movie, ["codec"], "H.264")
    set_par(movie, ["fps"], 30)

    note = make_op(comp, textDAT, "README_export_notes", -650, -40)
    note.text = (
        "Vision & Sound background generator\\n\\n"
        "Source footage: SOURCE_birds_track\\n"
        "Preview: OUT_vision_sound_bg\\n"
        "Export: pulse Record on EXPORT_movie_file_out.\\n"
        "Recommended: 1920x1080, 30 fps, 10-20 seconds, loop.\\n"
        "Use the exported mp4 in site/videos/ and point vision-sound.html to it.\\n"
    )

    comp.viewer = True
    ui.status = "Built /project1/%s. Save the file as vision_sound_bg.toe." % PROJECT_NAME
    return comp


build()
