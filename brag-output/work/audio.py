"""Original score + SFX for the Cat Safe Plants launch video. 120 BPM, D major, 48 kHz stereo."""
import numpy as np
import wave

SR = 48000
DUR = 22.0
N = int(SR * DUR) + SR  # 1s tail headroom, trimmed at the end
rng = np.random.default_rng(7)
BAR = 2.0  # 4 beats at 120 BPM


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def buf():
    return np.zeros((2, N))


def add(dst, t0, sig, gain=1.0, pan=0.0):
    i = int(round(t0 * SR))
    if i >= N:
        return
    sig = sig[: N - i]
    l = np.cos((pan + 1) * np.pi / 4) * np.sqrt(2)
    r = np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)
    dst[0, i : i + len(sig)] += sig * gain * l
    dst[1, i : i + len(sig)] += sig * gain * r


def tt(d):
    return np.arange(int(d * SR)) / SR


def attack(sig, a=0.004):
    n = max(1, int(a * SR))
    sig[:n] *= np.linspace(0, 1, n)
    return sig


def band(noise, lo, hi):
    spec = np.fft.rfft(noise)
    f = np.fft.rfftfreq(len(noise), 1 / SR)
    w = 1 / (1 + ((f / hi) ** 4)) * (1 - 1 / (1 + (f / max(lo, 1)) ** 4))
    return np.fft.irfft(spec * w, len(noise))


def lowpass_signal(x, cutoff):
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(spec / (1 + (f / cutoff) ** 4), len(x))


def pluck(freq, d=1.2, bright=1.0):
    t = tt(d)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.42)
    s += 0.22 * bright * np.sin(2 * np.pi * freq * 3.93 * t) * np.exp(-t / 0.05)
    s += 0.04 * bright * np.sin(2 * np.pi * freq * 9.2 * t) * np.exp(-t / 0.012)
    return attack(s, 0.003)


def bell(freq, d=2.5):
    t = tt(d)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.9)
    s += 0.35 * np.sin(2 * np.pi * freq * 2.76 * t) * np.exp(-t / 0.35)
    s += 0.12 * np.sin(2 * np.pi * freq * 5.4 * t) * np.exp(-t / 0.12)
    return attack(s, 0.002)


def pad_note(freq, d):
    t = tt(d)
    s = np.zeros_like(t)
    for det in (-0.006, 0.0, 0.0065):
        f = freq * (1 + det)
        for h in range(1, 9):
            s += np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6.28)) / (h ** 1.7)
    env = np.minimum(1, t / 0.35) * np.minimum(1, (d - t) / 0.45)
    return s * np.clip(env, 0, 1) / 3


def bass_note(freq, d):
    t = tt(d)
    s = np.sin(2 * np.pi * freq * t) + 0.18 * np.sin(2 * np.pi * 2 * freq * t) + 0.05 * np.sin(2 * np.pi * 3 * freq * t)
    env = np.exp(-t / 0.55) * np.minimum(1, (d - t) / 0.04)
    return attack(s * np.clip(env, 0, 1), 0.006)


def kick():
    t = tt(0.45)
    f = 45 + 75 * np.exp(-t / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / 0.16)
    click = band(rng.standard_normal(len(t)), 800, 3000) * np.exp(-t / 0.004) * 0.15
    return attack(s + click, 0.001)


def shaker(accent=1.0):
    t = tt(0.07)
    s = band(rng.standard_normal(len(t)), 5000, 11000) * np.exp(-t / 0.018) * np.minimum(1, t / 0.004)
    return s * accent


def rim():
    t = tt(0.12)
    s = band(rng.standard_normal(len(t)), 1200, 4200) * np.exp(-t / 0.02) * 0.6
    s += np.sin(2 * np.pi * mtof(74 + 12) * t) * np.exp(-t / 0.018) * 0.3
    return attack(s, 0.001)


def tick(freq):
    t = tt(0.06)
    s = band(rng.standard_normal(len(t)), 1500, 5000) * np.exp(-t / 0.006) * 0.6
    s += np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.02) * 0.5
    return attack(s, 0.0008)


def swell(d, lo=300, hi=3500):
    t = tt(d)
    s = band(rng.standard_normal(len(t)), lo, hi)
    env = np.sin(np.pi * np.clip(t / d, 0, 1) * 0.5) ** 3
    env *= np.minimum(1, (d - t) / 0.03)
    return s * env / (np.abs(s).max() + 1e-9)


def thump(freq):
    t = tt(1.0)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.35)
    s += 0.5 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t / 0.12)
    s += band(rng.standard_normal(len(t)), 60, 500) * np.exp(-t / 0.05) * 0.5
    return attack(s, 0.002)


def reverb(x, decay=0.55, length=2.2, cutoff=5000):
    out = np.zeros((2, N))
    t = tt(length)
    for ch in range(2):
        ir = rng.standard_normal(len(t)) * np.exp(-t / decay)
        ir = lowpass_signal(ir, cutoff)
        ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))
        ir /= np.sqrt((ir ** 2).sum())
        n = 1 << int(np.ceil(np.log2(N + len(ir))))
        y = np.fft.irfft(np.fft.rfft(x[ch], n) * np.fft.rfft(ir, n), n)[:N]
        out[ch] = y
    return out


CHORDS = {  # midi, root first
    "D": [62, 66, 69], "Bm": [59, 62, 66], "G": [55, 59, 62], "A": [57, 61, 64],
}
BARS = ["D", "Bm", "G", "A", "D", "Bm", "G", "A", "G", "A", "D"]

music = buf()
music_wet = buf()
bass = buf()
pads = buf()
drums = buf()
sfx = buf()
sfx_wet = buf()
kick_env = np.zeros(N)

# Pads: whole piece, gently.
for b, name in enumerate(BARS):
    t0 = b * BAR
    d = BAR + 0.5 if b < len(BARS) - 1 else 3.0
    for k, m in enumerate(CHORDS[name]):
        add(pads, t0, pad_note(mtof(m - 12 if k == 0 else m), d), 0.05, (k - 1) * 0.4)

# Marimba arpeggio: eighths. Sparse in the outro.
PATTERN = [0, 2, 4, 2, 3, 2, 4, 1]
for b, name in enumerate(BARS):
    r, th, fi = CHORDS[name]
    tones = [r + 12, th + 12, fi + 12, r + 24, th + 24]
    for e, idx in enumerate(PATTERN):
        t0 = b * BAR + e * 0.25
        if t0 >= 20.0 and e > 0:
            continue
        if 18.5 <= t0 < 20.0 and e % 2 == 1:
            continue
        vel = 0.85 if e % 2 == 0 else 0.6
        if t0 < 3.5:
            vel *= 0.8
        sig = pluck(mtof(tones[idx]), 1.2)
        add(music, t0, sig, 0.10 * vel, -0.25 if e % 2 else 0.25)
        add(music_wet, t0, sig, 0.10 * vel)

# Final chord at 20.0: bell voicing of D.
for k, m in enumerate([74, 78, 81, 86]):
    sig = bell(mtof(m), 3.0)
    add(music, 20.0 + k * 0.03, sig, 0.05, (k - 1.5) * 0.3)
    add(music_wet, 20.0 + k * 0.03, sig, 0.07)

# Bass from the library reveal.
for b, name in enumerate(BARS):
    root = CHORDS[name][0] - 24
    for off, d, v in [(0.0, 0.7, 1.0), (0.75, 0.25, 0.6), (1.0, 0.45, 0.85), (1.5, 0.45, 0.7)]:
        t0 = b * BAR + off
        if 3.5 <= t0 < 18.5:
            add(bass, t0, bass_note(mtof(root), d), 0.13 * v)
add(bass, 20.0, bass_note(mtof(38), 2.0), 0.12)

# Drums.
for beat in range(int(DUR * 2)):
    t0 = beat * 0.5
    if 3.5 <= t0 < 18.5 and beat % 2 == 0:
        add(drums, t0, kick(), 0.24)
        i = int(t0 * SR)
        e = np.exp(-tt(0.3) / 0.09)
        kick_env[i : i + len(e)] = np.maximum(kick_env[i : i + len(e)], e[: N - i])
    if 8.0 <= t0 < 18.5 and beat % 2 == 1:
        add(drums, t0, rim(), 0.05, 0.1)
        add(music_wet, t0, rim(), 0.03)
add(drums, 20.0, kick(), 0.18)
for s16 in range(int(DUR * 8)):
    t0 = s16 * 0.125
    if 3.5 <= t0 < 18.5:
        acc = 1.0 if s16 % 2 == 1 else 0.45
        add(drums, t0, shaker(acc), 0.022, 0.35)

# SFX, tuned to D major, sitting under the music.
for i, t0 in enumerate([2.95, 3.075, 3.2, 3.325]):  # typing "lily"
    add(sfx, t0, tick(mtof([81, 78, 81, 86][i])), 0.05, 0.1)
for t0 in [2.88, 7.5, 13.85, 17.75]:  # cursor clicks
    add(sfx, t0, tick(mtof(74)), 0.08)
    add(sfx_wet, t0, tick(mtof(74)), 0.04)

PENTA = [74, 76, 78, 81, 83, 86, 88, 90, 93]
for i in range(9):  # library cards stagger
    sig = pluck(mtof(PENTA[i]), 0.8, 0.6)
    add(sfx, 4.0 + i * 0.125, sig, 0.045, -0.5 + i * 0.12)
    add(sfx_wet, 4.0 + i * 0.125, sig, 0.05)
for i, m in enumerate([81, 86, 90]):  # lookalike cards
    sig = pluck(mtof(m), 0.9, 0.6)
    add(sfx, 11.5 + i * 0.25, sig, 0.06, (i - 1) * 0.4)
    add(sfx_wet, 11.5 + i * 0.25, sig, 0.06)

# Toxic verdict stamp at 9.0: soft swell into a low D felt thump.
add(sfx, 8.55, swell(0.45, 200, 2000), 0.05)
add(sfx, 9.0, thump(mtof(50)), 0.13)
add(sfx_wet, 9.0, thump(mtof(50)), 0.06)

# Safe verdict chime at 15.0, over the A bar: A5 + E6.
for k, m in enumerate([81, 88]):
    add(sfx, 15.0 + k * 0.04, bell(mtof(m), 2.0), 0.045, (k - 0.5) * 0.4)
    add(sfx_wet, 15.0 + k * 0.04, bell(mtof(m), 2.0), 0.08)

# Highlighter swipe.
add(sfx, 16.0, swell(0.55, 2500, 8000) * np.linspace(1, 0.4, int(0.55 * SR)), 0.02, 0.2)

# Transition air.
for t_cut in [3.5, 8.0, 14.5, 18.5]:
    d = 0.45
    add(sfx, t_cut - d, swell(d, 400, 4000), 0.035)
    add(sfx_wet, t_cut - d, swell(d, 400, 4000), 0.04)
add(sfx, 7.55, swell(0.45, 300, 3000), 0.03)

# Outro logo pop.
add(sfx, 18.6, pluck(mtof(86), 1.0, 0.5), 0.05)
add(sfx_wet, 18.6, pluck(mtof(86), 1.0, 0.5), 0.06)

duck = 1 - 0.35 * kick_env
room = reverb(music_wet + sfx_wet + 0.4 * pads)
mix = (music + sfx) + pads * duck + bass * duck + drums + room * 0.2

# Gentle master: tame lows below 30 Hz, soft clip.
for ch in range(2):
    spec = np.fft.rfft(mix[ch])
    f = np.fft.rfftfreq(N, 1 / SR)
    spec *= 1 - 1 / (1 + (f / 30) ** 4)
    mix[ch] = np.fft.irfft(spec, N)
mix = mix[:, : int(DUR * SR)]
fade = int(0.35 * SR)
mix[:, -fade:] *= np.linspace(1, 0, fade) ** 2
mix /= np.abs(mix).max() + 1e-9
mix = np.tanh(mix * 1.05) / np.tanh(1.05) * 0.89


def write(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16).T.copy()
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


write("soundtrack.wav", mix)
print("wrote soundtrack.wav", mix.shape[1] / SR, "s")

if __name__ == "__main__":
    def db(x):
        return 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)
    def pk(x):
        return 20 * np.log10(np.abs(x).max() + 1e-12)
    for name, st in [("marimba", music), ("pads", pads * duck), ("bass", bass * duck), ("drums", drums), ("sfx", sfx), ("room", room * 0.2)]:
        print(f"{name:8s} rms {db(st):6.1f} dB  peak {pk(st):6.1f} dB")
    w = int(0.4 * SR)
    fullmix = (music + sfx) + pads * duck + bass * duck + drums + room * 0.2
    peaks = [(i / SR, pk(fullmix[:, i:i + w])) for i in range(0, int(DUR * SR) - w, w // 2)]
    print("loudest windows:", sorted(peaks, key=lambda p: -p[1])[:6])
