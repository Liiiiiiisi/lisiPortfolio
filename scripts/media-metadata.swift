import AVFoundation
import Foundation

for path in CommandLine.arguments.dropFirst() {
    let asset = AVURLAsset(url: URL(fileURLWithPath: path))
    guard let track = asset.tracks(withMediaType: .video).first else {
        print("\(path)\t—")
        continue
    }
    let transformed = track.naturalSize.applying(track.preferredTransform)
    let width = Int(abs(transformed.width).rounded())
    let height = Int(abs(transformed.height).rounded())
    let duration = CMTimeGetSeconds(asset.duration)
    let durationText = duration.isFinite ? String(format: "%.2fs", duration) : "—"
    print("\(path)\t\(width)×\(height) · \(durationText)")
}
