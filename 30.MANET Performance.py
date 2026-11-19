import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('results.csv')

df['load'] = (
    df['rate']
    .str.replace('kbps', '')
    .astype(int)
)

m = df.groupby('load')[
    ['pdr', 'delay_ms', 'thr_kbps']
].mean()

print(m.round(2))

fig, ax = plt.subplots(
    1, 3,
    figsize=(12, 3.6)
)

for a, col, lab in zip(
    ax,
    m.columns,
    ['PDR (%)', 'Delay (ms)', 'Throughput (kbps)']
):

    a.plot(m.index, m[col], 'o-')

    a.set_xscale('log', base=2)

    a.set_xlabel(
        'Offered load per flow (kbps)'
    )

    a.set_ylabel(lab)

    a.grid(True)

plt.tight_layout()

plt.savefig(
    'manet_load.png',
    dpi=150
)